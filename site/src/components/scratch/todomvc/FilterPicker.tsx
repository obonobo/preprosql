/* eslint-disable react/display-name */
import {
  ComponentPropsWithoutRef,
  memo,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { Filter } from "./hooks";
import { StoreContext } from "./StoreContext";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  place-items: center;
  border-top: 2px solid rgba(128, 128, 128, 0.185);
  padding: 0.8em;

  &,
  * {
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
    color: grey;
    font-style: italic;
  }
`;

const PickerItem = memo(styled.span<{ $checked?: boolean }>`
  border: 2px solid rgba(186, 60, 35, 0);
  border-radius: 5px;
  padding: 0.1em 0.3em;
  margin: 0.2em 0.3em;
  user-select: none;
  box-sizing: content-box;

  :hover {
    border: 2px solid rgba(186, 60, 35, 0.5);
    cursor: pointer;
  }

  :active {
    background: rgba(186, 60, 35, 0.2);
  }

  ${({ $checked }) =>
    $checked &&
    css`
      border: 2px solid rgba(186, 60, 35, 0.7);
    `}
`);

const PickerItems = ({
  setFilter = () => null,
}: {
  setFilter?: (f: Filter) => void;
}) => {
  const [selected, setSelected] = useState<Filter>("all");

  const onClick = useCallback(
    ({ currentTarget: t }: MouseEvent<HTMLSpanElement>) =>
      setSelected(t.innerText.toLowerCase() as Filter),
    [setSelected]
  );

  useEffect(() => {
    setFilter(selected);
  }, [selected, setFilter]);

  return (
    <div>
      <PickerItem $checked={selected === "all"} onClick={onClick}>
        All
      </PickerItem>
      <PickerItem $checked={selected === "complete"} onClick={onClick}>
        Complete
      </PickerItem>
      <PickerItem $checked={selected === "incomplete"} onClick={onClick}>
        Incomplete
      </PickerItem>
    </div>
  );
};

// prettier-ignore
const Fade = styled.div<{ visible?: boolean }>`
  opacity: 0;
  transition: all 0.3s;
  ${({ visible }) => visible && css`
    opacity: 1;
  `}
`;

const ClearCompleted = () => {
  const { store, dispatch } = useContext(StoreContext);

  const atLeastOneItemIsComplete = useMemo(
    () => !!store.all.find((item) => item.completed),
    [store]
  );

  const clearCompleted = useCallback(
    () => dispatch({ type: "delete", item: { completed: true } }),
    [dispatch]
  );

  return (
    <Fade visible={atLeastOneItemIsComplete}>
      <PickerItem onClick={clearCompleted} style={{ justifySelf: "flex-end" }}>
        Clear Completed
      </PickerItem>
    </Fade>
  );
};

const ItemsLeft = memo(() => {
  const { store } = useContext(StoreContext);
  const itemsLeft = useMemo(
    () => store.filter((item) => !item.completed).length,
    [store]
  );

  return (
    <PickerItem style={{ pointerEvents: "none", justifySelf: "flex-start" }}>
      {itemsLeft} items left
    </PickerItem>
  );
});

const FilterPicker = ({
  setFilter = () => null,
  ...props
}: {
  setFilter?: (f: Filter) => void;
} & ComponentPropsWithoutRef<"div">): JSX.Element => (
  <Grid {...props}>
    <ItemsLeft />
    <PickerItems setFilter={setFilter} />
    <ClearCompleted />
  </Grid>
);

export default FilterPicker;
