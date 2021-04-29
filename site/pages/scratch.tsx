import { Button, TextField } from "@material-ui/core";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  Article,
  ArticleContextProvider,
  useArticleStore,
  useArticleStoreDispatch,
} from "../src/state/ArticleContext";

const ArticleEditorContext = createContext<{
  text: string;
  dispatchEdit: Dispatch<{ type: "change"; text?: string }>;
}>({ text: "", dispatchEdit: () => null });

const useEditorReducer = () =>
  useReducer(
    (state: string, action: { type: "change"; text?: string }) =>
      action.type === "change" ? action.text ?? state : state,
    null,
    () => ""
  );

const CoolButton = styled(Button).attrs({
  variant: "outlined",
  color: "secondary",
})``;

const ArticleProducer = () => {
  const dispatch = useArticleStoreDispatch();
  const [count, setCount] = useState(0);
  const { text, dispatchEdit } = useContext(ArticleEditorContext);

  useEffect(() => {
    setCount(count + 10);
    dispatch({
      type: "add",
      articles: new Article({ name: `article-${count}`, src: text }),
    });
  }, []);

  const addArticle = useCallback(() => {
    dispatch({
      type: "add",
      articles: new Article({ name: `article-${count}`, src: text }),
    });
    setCount(count + 1);
    dispatchEdit({
      type: "change",
      text: "",
    });
  }, []);

  const resetArticles = useCallback(() => {
    dispatch({ type: "reset" });
    setCount(0);
  }, [dispatch, setCount]);

  const handleSubmit = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    addArticle();
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchEdit({ type: "change", text: e.target.value });

  const Root = useRef(styled.div`
    margin-top: 5em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 10em;
    place-items: center;
    place-content: center;

    & > * {
      margin: 1em;
      width: 90%;
    }

    & > div {
      grid-area: 2 / 1 / 2 / 3;
      width: 95%;
    }
  `).current;

  const Input = useRef(styled(TextField)`
    grid-area: span;
  `).current;

  return (
    <Root>
      <CoolButton aria-label="add" onClick={addArticle}>
        ADD
      </CoolButton>
      <CoolButton aria-label="reset" onClick={resetArticles}>
        RESET
      </CoolButton>
      <Input
        autoFocus
        variant="outlined"
        label="Enter some text..."
        color="secondary"
        onChange={handleTyping}
        onKeyDown={handleSubmit}
        value={text}
      />
    </Root>
  );
};

const ArticleConsumer = () => {
  const { articles } = useArticleStore();
  const dispatch = useArticleStoreDispatch();

  const Ol = useRef(styled.ol`
    margin: auto;
    width: fit-content;
  `).current;

  console.log(articles);

  const articlesToListItems = () =>
    articles.map(({ name, src }) => (
      <li key={name}>
        {`${name}: ${src}`}
        <CoolButton onClick={() => dispatch({ type: "remove", names: name })}>
          DELETE
        </CoolButton>
      </li>
    ));

  return <Ol>{articlesToListItems()}</Ol>;
};

export default function Scratch() {
  const [text, dispatchEdit] = useEditorReducer();

  const Base = useRef(styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 3em;
  `).current;

  return (
    <ArticleContextProvider>
      <ArticleEditorContext.Provider value={{ text, dispatchEdit }}>
        <Base>
          <ArticleProducer />
          <ArticleConsumer />
        </Base>
      </ArticleEditorContext.Provider>
    </ArticleContextProvider>
  );
}
