import styled from "styled-components";

// prettier-ignore
const BarBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin: 0px !important;
  margin-bottom: -4em !important;
  padding: 0.2em;
  width: 100%;
  height: 5em;
  z-index: 1500;

  top: 0;
  position: sticky;
  transition: all 0.4s linear;
  border-top: 0.5em solid rgba(131, 131, 131, 0.575);

  ${({ $lifted, theme }) => $lifted && `
    box-shadow: 0px 8px 12px -6px rgba(71, 71, 71, 0.788);
    background-color: ${theme.colors.seeThroughPurple};
    border-top: 0.5em ${theme.colors.seeThroughPurple};
    backdrop-filter: blur(5px);
  `}

  & > div {
    display: none;

    ${({$lifted}) => $lifted && `
      flex-grow: 0;
      display: grid;
    `}
  }
`;

export default BarBase;
