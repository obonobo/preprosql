import styled from "styled-components";
import { urlFor } from "../../../util/utils";

const AppNameHeader = styled.h1.attrs(() => ({
  children: <a href={urlFor("/todo")}>todos</a>,
}))`
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  font: 100px "Helvetica Neue", Helvetica, Arial, sans-serif;
  opacity: 50%;
  margin: 0;
  user-select: none;
  color: #ba3c23;
  opacity: 0.4;
  position: relative;

  :hover {
    opacity: 0.8;
  }
`;

export default AppNameHeader;
