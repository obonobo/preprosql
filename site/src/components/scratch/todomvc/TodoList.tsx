import {
  useContext,
  useCallback,
  useMemo,
  memo,
  ComponentPropsWithoutRef,
} from "react";
import styled, { css } from "styled-components";
import { Todo, StoreContext } from "./StoreContext";

const TodoListBase = styled.div.attrs(
  ({ children }: { children?: JSX.Element[] }) => ({
    // children: (
    //   <>
    //     <div>
    //       <div>
    //         <div />
    //       </div>
    //     </div>
    //     {children}
    //   </>
    // ),
    children: <>{children}</>,
  })
)`
  margin: 2em;
  border-radius: 1em;
  background: rgba(128, 128, 128, 0.301);
  /*
  & > div {
    position: relative;
    top: 3em;
    background: grey;
    width: 80%;
    height: 100%;
  } */
`;

const TodoItemBase = styled.div`
  width: 100%;
  height: 5em;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto;
  place-items: center;
  place-content: center;

  background: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const TodoCheckbox = memo(styled.div.attrs(
  ({
    checked,
    $onCheck,
    ...props
  }: {
    $onCheck?: () => void;
    checked?: boolean;
  } & ComponentPropsWithoutRef<"div">) => ({
    ...props,
    checked,
    onClick: $onCheck,
    children: <span>{checked ? "🗸" : ""}</span>,
  })
)`
  transition: all 0.2s linear;
  transform: scale(1.2);
  user-select: none;

  position: relative;
  width: 1.2rem;
  text-align: center;
  height: 1.2rem;
  font-size: 1.4rem;
  font-weight: bolder;
  border: 1px solid grey;
  color: rgba(0, 128, 0, 0.658);
  padding: 0.2rem;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background: rgba(90, 90, 90, 0.363);
  }

  ${({ checked }) =>
    checked
      ? css`
          background: rgba(196, 196, 196, 0.692);
        `
      : css`
          background: rgba(196, 196, 196, 0.363);
        `}

  & > span {
    position: relative;
    top: -0.15em;
    left: -0em;
  }
`);

const TodoItemText = styled.span.attrs(
  ({
    children,
    strikeThrough,
  }: {
    children?: string;
    strikeThrough?: boolean;
  }) => ({
    children: children ?? "",
    strikeThrough,
  })
)`
  transition: all 0.2s linear;
  place-self: flex-start;
  font-size: 2rem;

  ${({ strikeThrough }) =>
    strikeThrough &&
    css`
      text-decoration: line-through;
      color: #888888;
    `}
`;

const TodoDelete = styled.span.attrs(() => ({
  children: <span>×</span>,
}))`
  transition: all 0.2s linear;
  user-select: none;

  color: white;
  background: #ff3c00;
  font-size: 2rem;
  font-weight: bolder;
  border-radius: 0.2em;

  width: 1em;
  height: 1em;
  position: relative;

  &:hover {
    background: #b92b00;
    cursor: pointer;
  }

  & > span {
    position: relative;
    top: -13%;
    left: 23%;
  }
`;

const TodoItem = ({ item }: { item?: Todo }) => {
  const { dispatch } = useContext(StoreContext);

  const toggleChecked = useCallback(
    () =>
      dispatch({
        type: "update",
        item: { ...item, completed: !item.completed },
      }),
    [dispatch, item]
  );

  return (
    <TodoItemBase>
      <TodoCheckbox checked={item.completed} $onCheck={toggleChecked} />
      <TodoItemText strikeThrough={item.completed}>{item.text}</TodoItemText>
      <TodoDelete />
    </TodoItemBase>
  );
};

const TodoList = () => {
  const { store, dispatch } = useContext(StoreContext);

  const mapStore = useMemo(
    () => store.all.map((item) => <TodoItem key={item.id} item={item} />),
    [store]
  );

  return <TodoListBase>{mapStore}</TodoListBase>;
};

export default TodoList;
