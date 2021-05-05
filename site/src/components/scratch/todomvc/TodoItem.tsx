import {
  ComponentPropsWithoutRef,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { useClickCounter } from "./hooks";
import Input from "./Input";
import { StoreContext, Todo } from "./StoreContext";

const fastTransition = css`
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Checkbox = styled.span.attrs<{ checked?: boolean }>(({ checked }) => ({
  checked,
  children: <span>✓</span>,
}))<{ checked?: boolean }>`
  border-radius: 50%;
  border: 1px dashed #808080;
  background: rgba(255, 255, 255, 0.178);
  display: flex;
  place-content: center;
  padding: 0.1em;
  width: 1em;
  height: 1em;
  font-size: 1.7rem;
  color: rgba(0, 128, 0, 0.623);
  font-weight: 900;

  :hover {
    cursor: pointer;
  }

  & > span {
    display: flex;
    place-content: center;
    user-select: none;

    ${({ checked }) =>
      !checked &&
      css`
        font-size: 0px;
      `}
  }
`;

const TodoItemBase = styled.div`
  display: grid;
  grid-template-columns: 1fr 20fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 0;

  padding: 0.5em 1em;
  box-sizing: border-box;
  align-items: center;
  text-align: start;
  font-size: 1.7rem;
  word-wrap: break-word;

  &,
  & * {
    ${fastTransition}
  }
`;

const DeleteItemButton = styled.span.attrs({
  children: "×",
})`
  opacity: 0%;
  color: #ba3c23;
  text-align: end;
  font-size: 2rem;
  user-select: none;
  width: min-content;
  height: min-content;
  padding: 0.1em 0.7em;
  transform: scale(1.2);

  :hover {
    cursor: pointer;
    transform: scale(1.6);
  }

  ${TodoItemBase}:hover & {
    opacity: 80%;
  }
`;

const ItemText = styled.span<{ completed?: boolean }>`
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 0 0 0 1em;
  box-sizing: border-box;
  word-wrap: break-word;
  width: 100%;
  max-width: 20em;

  ${({ completed }) =>
    completed &&
    css`
      text-decoration: line-through;
      color: rgba(128, 128, 128, 0.438);
    `}
`;

const InputWithoutShadow = styled(Input)`
  &&& {
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: none;
    padding: 0.7em 0;
    margin: 0 1em;
    height: 1.2em;
    border-bottom: 2px dashed rgba(128, 128, 128, 0.5);
  }
`;

const ItemTextOrEditItem = memo(
  ({
    edit,
    item,
    submit,
    ...props
  }: { edit?: boolean; item: Todo; submit: (text: string) => void } & (
    | ComponentPropsWithoutRef<"input">
    | ComponentPropsWithoutRef<"span">
  )) => {
    const [text, setText] = useState(item.text);
    const submitEdit = useCallback(() => submit(text), [text, submit]);

    const handleKeyDown = useCallback(
      ({ key }: { key: string }) =>
        key.toLowerCase() === "enter" && submitEdit(),
      [submitEdit]
    );

    const handleChange = useCallback(
      ({ target: value }) => setText(value.value),
      [setText]
    );

    return (
      <>
        {edit ? (
          <InputWithoutShadow
            {...props}
            value={text}
            onBlur={submitEdit}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <ItemText
            {...props}
            onClick={props.onClick}
            completed={item.completed}
          >
            {item.text}
          </ItemText>
        )}
      </>
    );
  }
);

ItemTextOrEditItem.displayName = "ItemTextOrEditItem";

const TodoItem = ({ item }: { item: Todo }): JSX.Element => {
  const { dispatch } = useContext(StoreContext);
  const [isSet, onClick, reset] = useClickCounter();

  const toggleCompleted = useCallback(
    () =>
      dispatch({
        type: "update",
        item: { ...item, completed: !item.completed },
      }),
    [item, dispatch]
  );

  const deleteItem = useCallback(
    () =>
      dispatch({
        type: "delete",
        item,
      }),
    [dispatch, item]
  );

  const consumeInput = useCallback(
    ({ target: value }) =>
      dispatch({
        type: "update",
        item: {
          ...item,
          text: typeof value === "string" ? value : item.text,
        },
      }),
    [dispatch, item]
  );

  const submitEdit = useCallback(
    (text: string) => {
      if (text === "") {
        deleteItem();
      } else {
        consumeInput({ target: text });
        reset();
      }
    },
    [reset, consumeInput, deleteItem]
  );

  return (
    <TodoItemBase>
      <Checkbox checked={item.completed} onClick={toggleCompleted} />
      <ItemTextOrEditItem
        autoFocus
        item={item}
        edit={isSet}
        submit={submitEdit}
        onClick={onClick as () => void}
      />
      <DeleteItemButton onClick={deleteItem} />
    </TodoItemBase>
  );
};

export default TodoItem;
export { fastTransition };
