import { memo, useCallback, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import { StoreContext } from "./StoreContext";

const Button = memo(styled.span.attrs<{ $emptyList?: boolean }>({
  children: "^",
})<{ $emptyList?: boolean }>`
  user-select: none;
  transition: all 0.1s linear;
  transform: rotate(180deg) scale(2, 1);
  color: rgba(128, 128, 128, 0.534);
  z-index: 500;
  font-size: 2rem;
  position: relative;
  inset: -1.5em auto auto -9.5em;
  height: 0;

  :hover {
    cursor: pointer;
    color: rgba(128, 128, 128, 0.836);
  }

  :active {
    transform: rotate(180deg) scale(2, 1) translate(0, -0.1em);
  }

  ${({ $emptyList }) =>
    $emptyList &&
    css`
      opacity: 0%;
    `}
`);

const ToggleSelectAll = (): JSX.Element => {
  const { store, dispatch } = useContext(StoreContext);
  const emptyList = useMemo(() => store.all.length === 0, [store]);
  const nextToggleValue = useMemo(() => emptyList || !store.all[0].completed, [
    store,
    emptyList,
  ]);

  const handleClick = useCallback(
    () =>
      dispatch({
        type: "manipulate",
        manipulation: (stateStore) =>
          stateStore
            .mutate()
            .handle((list) =>
              list.map((item) => ({ ...item, completed: nextToggleValue }))
            )
            .freeze(),
      }),
    [nextToggleValue, dispatch]
  );

  return <Button $emptyList={emptyList} onClick={handleClick} />;
};

export default ToggleSelectAll;
