/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-classes-per-file */

import { createContext, Dispatch, ReactNode, useReducer, useMemo } from "react";

type Todo = {
  id?: number;
  text?: string;
  completed?: boolean;
};

class TodoStore {
  static Mutator = class TodoMutator {
    private current: Todo[];

    constructor(todos: Todo[] = []) {
      this.current = todos;
    }

    get todos(): Todo[] {
      return [...this.current];
    }

    handle(manipulate: (current: Todo[]) => Todo[]): TodoMutator {
      this.current = manipulate(this.current);
      return this;
    }

    freeze(): TodoStore {
      return new TodoStore(this.current);
    }
  };

  private todos: Todo[];

  constructor(items: Todo[] = []) {
    this.todos = items ?? [];
  }

  static of(...items: Todo[]): TodoStore {
    return new TodoStore(items);
  }

  static mutate(previous: TodoStore) {
    return new TodoStore.Mutator(previous.todos);
  }

  mutate() {
    return TodoStore.mutate(this);
  }

  get all(): Todo[] {
    return [...this.todos];
  }

  get length(): number {
    return this.todos.length;
  }

  paginate(pageSize = 5): Todo[][] {
    return this.todos.reduce(
      (p, c) =>
        p[p.length - 1].length >= pageSize
          ? p.concat([[c]])
          : p.slice(0, p.length - 1).concat([p[p.length - 1].concat([c])]),
      [[]]
    );
  }

  next({ text, completed }: { text?: string; completed?: boolean }): Todo {
    return {
      text,
      completed,
      id: this.todos.reduce((p, c) => Math.max(p, c.id), Number.MIN_VALUE) + 1,
    };
  }

  filter(on: (value: Todo, index: number, array: Todo[]) => boolean): Todo[] {
    return this.todos.filter(on);
  }
}

type TodoAction = {
  type: "create" | "update" | "delete" | "manipulate";
  item?: Todo;
  manipulation?: (store: TodoStore) => TodoStore;
};

const actions: {
  [method: string]: (state: TodoStore, action: TodoAction) => TodoStore;
} = {
  create: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) => list.concat([state.next({ ...action.item })]))
          .freeze()
      : state,

  delete: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) =>
            list.filter(
              (item) =>
                !(
                  ("id" in action.item ? action.item.id === item.id : true) &&
                  ("text" in action.item
                    ? action.item.text === item.text
                    : true) &&
                  ("completed" in action.item
                    ? action.item.completed === item.completed
                    : true)
                )
            )
          )
          .freeze()
      : state,

  update: (state: TodoStore, action: TodoAction) =>
    action.item
      ? state
          .mutate()
          .handle((list) =>
            list.map((item) =>
              item.id === action.item.id ? action.item : item
            )
          )
          .freeze()
      : state,

  manipulate: (state: TodoStore, action: TodoAction) =>
    action.manipulation ? action.manipulation(state) : state,
};

const reducer = (state: TodoStore, action: TodoAction): TodoStore =>
  action.type in actions ? actions[action.type](state, action) : state;

const StoreContext = createContext<{
  store: TodoStore;
  dispatch: Dispatch<TodoAction>;
}>({
  store: new TodoStore(),
  dispatch: () => null,
});

const StoreContextProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [store, dispatch] = useReducer(reducer, null, () => TodoStore.of());

  const contextPackage = useMemo(() => ({ store, dispatch }), [
    store,
    dispatch,
  ]);

  return (
    <StoreContext.Provider value={contextPackage}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider, StoreContext, TodoStore };
export type { Todo, TodoAction };
