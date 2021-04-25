import styled from "styled-components";

// prettier-ignore
const TranslateDownOnClick = styled.div`
  transition: ${({ theme }) => theme
    && theme.transitions
    && theme.transitions.liftedFast
    || "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"};

  :active {
    transform: translateY(${({ distance }) => distance || "0.05em"});
  }
`;

export default TranslateDownOnClick;
