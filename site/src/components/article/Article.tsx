import styled from "styled-components";

const Article = styled.div<{ fullwidth?: boolean }>`
  width: ${({ fullwidth }) => fullwidth && `width: 100vw;`};
  max-width: 50em;
  min-width: 20em;
  margin-left: 2em;
  margin-right: 2em;
  margin-top: 2em;
`;

export default Article;
