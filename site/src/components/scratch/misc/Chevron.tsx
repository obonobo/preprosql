import styled from "styled-components";

const Chevron = styled.span.attrs(() => ({
  children: "^",
}))`
  display: inline-block;
  font-stretch: wider;
  font-weight: bolder;
  user-select: none;
  transition: all 0.1s linear;
  transform: rotate(180deg) scale(2, 1);
  color: rgba(128, 128, 128, 0.534);
  z-index: 500;
  font-size: 2rem;

  :hover {
    cursor: pointer;
    color: rgba(128, 128, 128, 0.836);
  }

  :active {
    transform: rotate(180deg) scale(2, 1) translate(0, -0.1em);
  }
`;

export default Chevron;
