import styled from "styled-components";

const AppNameHeader = styled.h1.attrs(() => ({
  children: "todos",
}))`
  font: 100px "Helvetica Neue", Helvetica, Arial, sans-serif;
  opacity: 50%;
  margin: 0;
`;

export default AppNameHeader;
