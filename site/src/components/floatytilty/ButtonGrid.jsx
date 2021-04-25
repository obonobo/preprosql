import { useContext } from "react";
import styled from "styled-components";
import { LiftedContext } from "../../util/contexts";
import defaultTheme from "../../util/styles";
import { DownloadNow, TryInBrowser } from "../navbar/Buttons";

const Grid = styled.div.attrs({ theme: defaultTheme })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  place-items: center;
  margin-right: 1em;
  justify-content: center;
  justify-items: center;

  * {
    color: #faead3;
    font-family: ${({ theme }) => theme.fonts.IBMPlexSerif};
    font-weight: 800;
  }
`;

const ButtonGrid = ({ ...props }) => (
  <Grid {...props}>
    <DownloadNow />
    <TryInBrowser />
  </Grid>
);

// prettier-ignore
const Buttons = styled(ButtonGrid).attrs({ theme: defaultTheme })`
  &&& {
    transform: translate(50%, 0);
    transition: ${({ theme }) => theme.transitions.lifted};
    position: fixed;
    z-index: 5000;
    height: 5em;
    width: fit-content;
    margin: 0;
    grid-column-gap: 19em;

    right: 50%;
    top: 15.5em;

    ${({ $lifted }) => $lifted && `
      grid-column-gap: 1em;
      transform: translate(0, 0);
      right: 1em;
      top: 0.05em;
    `}

    button {
      backdrop-filter: sepia(20%) brightness(200%) blur(2px);
      background-color: ${({ theme }) => theme.colors.seeThroughPurple};
      ${({ $lifted }) => $lifted && `
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
      `};
    }
  }
`;

const DynamicButtons = (props) => {
  const { lifted } = useContext(LiftedContext);
  return <Buttons $lifted={lifted} {...props} />;
};

export { ButtonGrid, DynamicButtons };
