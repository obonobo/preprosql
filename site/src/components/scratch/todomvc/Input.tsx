import styled, { css, DefaultTheme, StyledComponent } from "styled-components";

const Input: StyledComponent<
  "input",
  DefaultTheme,
  { autoFocus: boolean; $emptyList?: boolean },
  "autoFocus"
> = styled.input.attrs({ autoFocus: true })<{ $emptyList: boolean }>`
  border: 0px solid grey;
  border-radius: 5px 5px 0px 0px;
  padding: 1em 4em;
  font-size: 1.3rem;
  margin: 0.1em 0.7em;
  width: 100%;
  box-sizing: border-box;
  background: white;
  box-shadow: 0px 11px 67px -4px rgba(0, 0, 0, 0.6);
  z-index: 50;
  position: relative;
  inset: 0 auto auto 0;
  font-family: "Noto Serif", "DejaVu Serif", "Serif", serif;
  font-style: italic;
  outline: none;

  ${({ $emptyList }) =>
    $emptyList &&
    css`
      border-radius: 5px;
    `}
`;

export default Input;
