import styled from "styled-components";

const TranslateDownOnClick = styled.div`
  :active {
    transform: translateY(${({ distance }) => distance || "0.05em"});
  }
`;

export default TranslateDownOnClick;
