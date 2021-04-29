/* eslint-disable no-unused-vars */
import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { useLifted } from "../../state/LiftedContext";
import $ from "../../util/styles";
import { DownloadNow, TryInBrowser } from "../navbar/Buttons";

const Grid = styled.div`
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
    font-family: ${$.fonts.IBMPlexSerif};
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
const Buttons = styled(ButtonGrid)<{ $lifted: boolean }>`
  &&& {
    transform: translate(50%, 0);
    transition: ${$.transitions.lifted};
    position: fixed;
    z-index: 5000;
    height: 0em;
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
      transition: ${$.transitions.lifted};
      backdrop-filter: sepia(20%) brightness(200%) blur(2px);
      background-color: ${($.colors.createBlue as ((_: any) => string))({ opacity: 0.8 })};
      ${({ $lifted }) => $lifted && `
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
      `};
    }
  }
`;

const DynamicButtons = (props: ComponentPropsWithoutRef<"div">) => (
  <Buttons $lifted={useLifted()} {...props} />
);

export { ButtonGrid, DynamicButtons };
