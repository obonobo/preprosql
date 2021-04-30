import { ReactNode } from "react";
import styled, { css } from "styled-components";

const BackgroundThingy = styled.div.attrs(() => ({
  children: (
    <div>
      <div>
        <div />
      </div>
    </div>
  ),
  $bgDiv: (width = 96, zIndex: number | string = "unset") => css`
    border: 1px solid black;
    width: ${width}%;
    height: 100%;
    position: relative;
    top: 1em;
    left: ${(100 - width) / 2}%;
    background: white;
    z-index: ${zIndex};
  `,
}))`
  height: 30em;
  background: white;
  position: relative;
  border: 1px solid black;

  & > div {
    ${({ $bgDiv }) => $bgDiv(96, -1)}
    & > div {
      ${({ $bgDiv }) => $bgDiv(96, -2)}
      & > div {
        ${({ $bgDiv }) => $bgDiv(96, -3)}
      }
    }
  }
`;

export default function StackOfPapers({ children }: { children?: ReactNode }) {
  return <BackgroundThingy />;
}
