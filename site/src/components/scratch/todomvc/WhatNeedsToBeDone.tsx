/* eslint-disable react/no-unused-prop-types */
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

const paginate = (pageSize = 5) => <T,>(previous: T[][], current: T): T[][] =>
  previous[previous.length - 1].length >= pageSize
    ? previous.concat([[current]])
    : previous
        .slice(0, previous.length - 1)
        .concat([previous[previous.length - 1].concat([current])]);

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
        <List
          style={{
            overflow: "unset",
            ...(filteredList.length === 0 ? { marginTop: "-2.1em" } : {}),
          }}
        >
          {filteredList.length > 0 && (
            <List ref={ref}>
              {
                // prettier-ignore
                filteredList
                  .reduce<Todo[][]>(paginate(pageSize), [[]])[page]
                  .map((item) => item && <TodoItem key={item.id} item={item} />)
              }
            </List>
          )}
          <FilterPicker setFilter={setFilter} />
        </List>
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
