import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  memo,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import FilterPicker from "./FilterPicker";
import { Filter, useFilter, useScrollToBottomFunction } from "./hooks";
import Input from "./Input";
import { StoreContext, Todo, TodoStore } from "./StoreContext";
import TodoItem from "./TodoItem";
import ToggleSelectAll from "./ToggleSelectAll";

const Root = styled.div`
  position: relative;
  width: min-content;
  height: 4.6em;
`;

const PlaceholderText = styled.div.attrs<{ $emptyInput?: boolean }>(
  ({ $emptyInput }) => ({
    children: "What needs to be done?",
    $emptyInput,
  })
)<{ $emptyInput?: boolean }>`
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  pointer-events: none;
  user-select: none;
  position: relative;
  text-align: left;
  inset: -2em auto auto -50%;
  transform: translate(83%, 0);
  z-index: 100;
  color: rgba(160, 160, 160);
  opacity: 82.9%;
  font-style: italic;
  font-size: 1.6rem;
  width: fit-content;

  ${({ $emptyInput }) =>
    !$emptyInput &&
    css`
      opacity: 0%;
    `}
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 10fr;
  justify-items: center;

  max-height: 80%;
  width: 43.5em;
`;

const List = styled.div<{ children?: ReactNode[] }>`
  min-height: 5em;
  max-height: 70vh;
  width: 100%;
  overflow-y: scroll;
  background: white;
  margin-top: -1em;
  z-index: 100;

  ${({ children }) =>
    (!children || children.length === 0) &&
    css`
      opacity: 0%;
    `}
`;

const UnscrollableList = styled(List)<{ list: unknown[] }>`
  overflow: unset;
  margin-top: ${({ list }) => list.length === 0 && "-2.1em"};
`;

/**
 * A reducer for paginating an array. Two values are returned - this makes it
 * easy to use the reducer with spread syntax in the Array.reduce function. Like
 * so:
 *
 * ```js
 * myArray.reduce(...paginate(25))
 * ```
 *
 * @param pageSize Number of elements per page
 * @returns A tuple of [reducer, starting value]
 */
const paginate = (pageSize = 5): [<T>(p: T[][], c: T) => T[][], [[]]] => [
  <T,>(p: T[][], c: T): T[][] =>
    p[p.length - 1].length >= pageSize
      ? p.concat([[c]])
      : p.slice(0, p.length - 1).concat([p[p.length - 1].concat([c])]),
  [[]],
];

const FilledList = memo(
  forwardRef(
    (
      {
        list,
        pageSize,
        page,
      }: { list: Todo[]; pageSize: number; page: number },
      ref: MutableRefObject<HTMLDivElement>
    ) => (
      <List ref={ref}>
        {list
          .reduce<Todo[][]>(...paginate(pageSize))
          [page].map((item) => item && <TodoItem key={item.id} item={item} />)}
      </List>
    )
  )
);

const BigList = memo(
  forwardRef(
    (
      {
        store,
        filteredList,
        page = 0,
        pageSize = Number.MAX_VALUE,
        setFilter,
      }: {
        store: TodoStore;
        filteredList: Todo[];
        page?: number;
        pageSize?: number;
        setFilter: (f: Filter) => void;
      },
      ref: MutableRefObject<HTMLDivElement>
    ) =>
      store.length > 0 && (
        <UnscrollableList list={filteredList}>
          {filteredList.length > 0 && (
            <FilledList
              ref={ref}
              list={filteredList}
              pageSize={pageSize}
              page={page}
            />
          )}
          <FilterPicker setFilter={setFilter} />
        </UnscrollableList>
      )
  )
);

BigList.displayName = "BigList";

const WhatNeedsToBeDone = ({
  pageSize = Number.MAX_VALUE,
}: {
  pageSize?: number;
}): JSX.Element => {
  const [text, setText] = useState("");
  const [page] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfList = useScrollToBottomFunction(listRef);
  const { store, dispatch } = useContext(StoreContext);
  const { filter, setFilter } = useFilter();

  const emptyInput = useMemo(() => text === "", [text]);
  const emptyList = useMemo(() => store.length === 0, [store]);
  const filteredList = useMemo(() => store.all.filter(filter), [store, filter]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    [setText]
  );

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" || text === "") return;
      dispatch({
        type: "create",
        item: store.next({ completed: false, text }),
      });
      setText("");
      scrollToBottomOfList();
    },
    [text, dispatch, store, scrollToBottomOfList]
  );

  return (
    <Root>
      <AppGrid>
        <Input
          $emptyList={emptyList}
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={text}
        />
        <PlaceholderText $emptyInput={emptyInput} />
        <ToggleSelectAll />
        <BigList
          ref={listRef}
          store={store}
          filteredList={filteredList}
          setFilter={setFilter}
          pageSize={pageSize}
          page={page}
        />
      </AppGrid>
    </Root>
  );
};

export default WhatNeedsToBeDone;
