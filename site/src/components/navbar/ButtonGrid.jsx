import styled from "styled-components";

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  place-items: center;
  margin-right: 1em;
`;

export default ButtonGrid;
