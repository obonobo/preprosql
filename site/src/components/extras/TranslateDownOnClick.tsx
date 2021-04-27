import styled, { css } from "styled-components";

const clicky = ({ distance = "0.05em" } = {}) => css`
  :active {
    transform: translateY(${distance});
  }
`;

// prettier-ignore
const TranslateDownOnClick = styled.div<{ distance: string }>`
  transition: ${({ theme }) => theme
    && theme.transitions
    && theme.transitions.liftedFast
    || "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"};

  ${({ distance }) => clicky({ distance })}
`;

export default TranslateDownOnClick;
