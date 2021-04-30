import { useCallback, useState } from "react";
import { Todo } from "./StoreContext";

type Filter = "all" | "complete" | "incomplete";

const useFilter = (): {
  filter: (f: Todo) => boolean;
  setFilter: (f: Filter) => void;
} => {
  const [filter, setFilter] = useState<(f: Todo) => boolean>(() => () => true);

  const updateFilter = useCallback<(f: Filter) => void>(
    (f: Filter) => {
      switch (f) {
        case "all":
          setFilter(() => () => true);
          break;
        case "complete":
          setFilter(() => (x: Todo) => x.completed);
          break;
        case "incomplete":
          setFilter(() => (x: Todo) => !x.completed);
          break;
        default:
          break;
      }
    },
    [setFilter]
  );

  return { filter, setFilter: updateFilter };
};

export { useFilter };
export type { Filter };
