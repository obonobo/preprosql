import Article from "../Article";
import CodeSnippet from "../CodeSnippet";

export default function DemoArticle({
  loremIpsum,
  times = 1,
  children,
  ...props
}) {
  const lorem = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  `;

  const codeSnippet = `
    const omg = wtf;
    function doSomething({ param1 }) {
      var omg = \`Here we go again\`
    }
  `;

  return (
    <Article {...props}>
      <CodeSnippet js>{codeSnippet}</CodeSnippet>
      {loremIpsum
        ? [...Array(times).keys()].reduce((p) => p + lorem, lorem)
        : children}
    </Article>
  );
}
