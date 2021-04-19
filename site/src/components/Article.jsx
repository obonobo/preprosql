import styled from "styled-components";

const ArticleBase = styled.p`
  max-width: 50em;
  min-width: 20em;
  margin-left: 2em;
  margin-right: 2em;
`;

export default function Article({ children, ...props }) {
  return <ArticleBase {...props}>{children}</ArticleBase>;
}
