import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";
import FilterPicker from "./FilterPicker";
import { useFilter } from "./hooks";
import Input from "./Input";
import PagePicker from "./PagePicker";
import { StoreContext, Todo } from "./StoreContext";
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
  height: 5em;
  width: 100%;
  background: white;
  margin-top: -2em;
  z-index: 100;

  ${({ children }) =>
    (!children || children.length === 0) &&
    css`
      opacity: 0%;
    `}
`;

const paginate = (pageSize = 5) => <T,>(p: T[][], c: T): T[][] =>
  p[p.length - 1].length >= pageSize
    ? p.concat([[c]])
    : p.slice(0, p.length - 1).concat([p[p.length - 1].concat([c])]);

const WhatNeedsToBeDone = ({
  pageSize = 30,
}: {
  pageSize?: number;
}): JSX.Element => {
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);

  const { store, dispatch } = useContext(StoreContext);
  const { filter, setFilter } = useFilter();

  const emptyInput = useMemo(() => text === "", [text]);
  const emptyList = useMemo(() => store.length === 0, [store]);

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
    },
    [text, dispatch, store]
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
        {store.length > 0 && (
          <List>
            {
              // prettier-ignore
              store.all
                .filter(filter)
                .reduce<Todo[][]>(paginate(pageSize), [[]])[page]
                .map((item) => item && <TodoItem key={item.id} item={item} />)
            }
            <FilterPicker
              setFilter={setFilter}
              style={{ marginBottom: "3em" }}
            />
            {store.length > pageSize && (
              <PagePicker
                page={page}
                totalPages={Math.ceil(store.length / pageSize)}
                setPage={setPage}
              />
            )}
          </List>
        )}
      </AppGrid>
    </Root>
  );
};

export default WhatNeedsToBeDone;
