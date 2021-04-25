import { Button } from "@material-ui/core";
import styled from "styled-components";
import defaultTheme from "../../util/styles";
import TranslateDownOnClick from "../extras/TranslateDownOnClick";
import Floatable from "../Floatable";
import Tiltable from "../Tiltable";

const Clickable = styled(TranslateDownOnClick).attrs({ distance: "-0.08em" })`
  height: 80%;
  transition: all 0.01s;
  transform: translateY(-0.15em);

  * {
    height: 100%;
    width: inherit;
  }
`;

const CoolButton = styled(Button).attrs({
  variant: "outlined",
  theme: defaultTheme,
})`
  box-shadow: ${({ theme }) => theme.shadows.sparse};
  width: 11em;
  height: 5em;

  &&& {
    border-radius: 0.5em;
    background-color: rgba(255, 255, 255, 0.1);

    &&&& * {
      font-size: 1.3em;
      width: inherit;
      height: inherit;
      text-transform: none;
    }
  }
`;

const FloatyTiltyButton = (props) => (
  <Clickable>
    <Floatable distance="0.2em">
      <Tiltable speed={500}>
        <CoolButton {...props} />
      </Tiltable>
    </Floatable>
  </Clickable>
);

const DownloadNow = (props) => (
  <FloatyTiltyButton {...props}>Download Now!</FloatyTiltyButton>
);

const TryInBrowser = (props) => (
  <FloatyTiltyButton {...props}>Try in Browser!</FloatyTiltyButton>
);

export { DownloadNow, TryInBrowser, CoolButton, FloatyTiltyButton };
