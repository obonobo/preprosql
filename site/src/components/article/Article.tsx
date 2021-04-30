import axios from "axios";
import { sanitize } from "dompurify";
import hljs from "highlight.js";
import marked from "marked";
import { ComponentPropsWithoutRef, memo, useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../extras/Spinner";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) =>
    hljs.highlight(code, {
      language: hljs.getLanguage(lang) ? lang : "plaintext",
      ignoreIllegals: true,
    }).value,
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

type ArticleProps = {
  src?: string;
  children?: string;
  fullwidth?: boolean;
} & ComponentPropsWithoutRef<"article">;

const Article = styled.article<{ fullwidth?: boolean }>`
  width: ${({ fullwidth }) => fullwidth && `width: 100vw;`};
  max-width: 50em;
  min-width: 20em;
  margin-left: 2em;
  margin-right: 2em;
  margin-top: 2em;
`;

const MarkdownArticle = memo(({ src, children, ...props }: ArticleProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      let newText = children ?? "";
      if (src) newText += await (await axios.get(src)).data;
      setText(sanitize(marked(newText)));
    })();
  }, [src, children]);

  if (text === "") return <Spinner />;
  return <Article dangerouslySetInnerHTML={{ __html: text }} {...props} />;
});

export default Article;
export { Article, MarkdownArticle, marked };
export type { ArticleProps };
