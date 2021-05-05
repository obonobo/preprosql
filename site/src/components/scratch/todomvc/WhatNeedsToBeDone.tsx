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
import FilterPicker from "./Filter";
import { useFilter } from "./hooks";
import Input from "./Input";
import { StoreContext } from "./StoreContext";
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

const WhatNeedsToBeDone = (): JSX.Element => {
  const { store, dispatch } = useContext(StoreContext);
  const [text, setText] = useState<string>("");
  const { filter, setFilter } = useFilter();

  const emptyInput = useMemo(() => text === "", [text]);
  const emptyList = useMemo(() => store.all.length === 0, [store]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    [setText]
  );

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" || text === "") return;
      dispatch({
        type: "create",
        item: {
          id:
            store.all.reduce((p, c) => Math.max(p, c.id), Number.MIN_VALUE) + 1,
          completed: false,
          text,
        },
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
        {store?.all?.length > 0 && (
          <List>
            {store?.all
              ?.filter(filter)
              ?.map((item) => item && <TodoItem key={item.id} item={item} />)}
            <FilterPicker setFilter={setFilter} />
          </List>
        )}
      </AppGrid>
    </Root>
  );
};

export default WhatNeedsToBeDone;
