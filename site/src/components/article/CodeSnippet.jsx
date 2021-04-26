/* eslint-disable no-nested-ternary */
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { duotoneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { duotoneSpace as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";

const codify = ({ bash, js, python, html, type, plaintext, children }) => `
~~~${
  type || plaintext
    ? "plaintext"
    : bash
    ? "bash"
    : html
    ? "html"
    : js
    ? "js"
    : python
    ? "python"
    : "plaintext"
}
${children.replaceAll(/ *\| ?/g, "").trim()}
~~~
`;

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={theme}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} />
    );
  },
};

const CodeSnippet = ({
  bash,
  js,
  html,
  python,
  plaintext,
  type,
  children,
  ...props
}) => (
  <ReactMarkdown components={components} remarkPlugins={[gfm]} {...props}>
    {codify({ bash, js, python, html, plaintext, type, children })}
  </ReactMarkdown>
);

const MarkdownSnippet = ({ children, ...props }) => {
  console.log(children);
  return (
    <ReactMarkdown components={components} remarkPlugins={[gfm]} {...props}>
      {children}
    </ReactMarkdown>
  );
};

export { MarkdownSnippet, CodeSnippet };
