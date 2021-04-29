import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import Article from "./articles/Article";
import ArticleStore from "./articles/ArticleStore";

type ArticleAction = {
  type: "add" | "remove" | "reset";
  articles?: Article | Article[];
  names?: string | string[];
};

const ArticleStoreContext = createContext<ArticleStore>(new ArticleStore());
const ArticleDispatchContext = createContext<Dispatch<ArticleAction>>(() => {});

/**
 * Check out the gnarly ternary operators below - how's that for functional
 * programming :)
 *
 * @param state Current state
 * @param action What action you want to take
 * @returns The new state
 */
const reducer = (state: ArticleStore, action: ArticleAction) => {
  switch (action.type) {
    case "add":
      return action.articles
        ? state.with(
            ...("name" in action.articles ? [action.articles] : action.articles)
          )
        : state;
    case "remove":
      return action.names !== null && action.names !== undefined
        ? new ArticleStore(
            ...state.articles.filter((a) =>
              action.names instanceof Array
                ? action.names.reduce((p, c) => p || c !== a.name, false)
                : action.names !== a.name
            )
          )
        : action.articles
        ? new ArticleStore(
            ...state.articles.filter((a) =>
              action.articles instanceof Array
                ? action.articles.reduce(
                    (p, c) => p || c.name !== a.name,
                    false
                  )
                : action.articles.name !== a.name
            )
          )
        : state;
    case "reset":
      return new ArticleStore();
    default:
      return state;
  }
};

const ArticleContextProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null, () => new ArticleStore());
  return (
    <ArticleDispatchContext.Provider value={dispatch}>
      <ArticleStoreContext.Provider value={state}>
        {children}
      </ArticleStoreContext.Provider>
    </ArticleDispatchContext.Provider>
  );
};

const useArticleStore = () => useContext(ArticleStoreContext);
const useArticleStoreDispatch = () => useContext(ArticleDispatchContext);

export default ArticleContextProvider;
export type { ArticleAction };
export {
  Article,
  ArticleStore,
  ArticleStoreContext,
  ArticleDispatchContext,
  ArticleContextProvider,
  useArticleStore,
  useArticleStoreDispatch,
};
