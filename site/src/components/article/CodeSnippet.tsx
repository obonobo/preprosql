/* eslint-disable no-nested-ternary */
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { duotoneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { duotoneSpace as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { ComponentPropsWithoutRef } from "react";

const codify = ({
  bash,
  js,
  python,
  html,
  type,
  plaintext,
  children,
}: {
  children?: string | React.ReactNode;
  type?: string;
} & { [key: string]: boolean | string }) => `
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
${(children instanceof String ? children : "").replaceAll(/ *\| ?/g, "").trim()}
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
}: {
  js?: boolean;
  bash?: boolean;
  html?: boolean;
  python?: boolean;
  plaintext?: boolean;
  type?: string;
  children?: string & React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">) => (
  <ReactMarkdown
    components={components as unknown}
    remarkPlugins={[gfm]}
    {...props}
  >
    {codify({ bash, js, python, html, plaintext, type, children })}
  </ReactMarkdown>
);

const MarkdownSnippet = ({
  children,
  ...props
}: { children?: string } & ComponentPropsWithoutRef<"div">) => (
  <ReactMarkdown
    components={components as unknown}
    remarkPlugins={[gfm]}
    {...props}
  >
    {children}
  </ReactMarkdown>
);

export { MarkdownSnippet, CodeSnippet };
