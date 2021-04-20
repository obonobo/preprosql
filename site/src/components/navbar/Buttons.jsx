import { Button } from "@material-ui/core";
import styled from "styled-components";
import Floatable from "../Floatable";
import Tiltable from "../Tiltable";
import TranslateDownOnClick from "../extras/TranslateDownOnClick";

const StyledTranslateDownOnClick = styled(TranslateDownOnClick)`
  height: 80%;
  width: 100%;
  transition: all 0.01s;
  transform: translateY(-0.15em);

  * {
    height: 100%;
    width: inherit;
  }
`;

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.shadows.sparse};

  & * {
    font-size: 1.1em;
    text-transform: none;
  }
`;

const Base = (props) => (
  <StyledButton
    variant="outlined"
    style={{
      borderRadius: "0.5em",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    }}
    {...props}
  />
);

const FloatyTiltyButton = (props) => (
  <StyledTranslateDownOnClick distance="-0.08em">
    <Floatable distance="0.2em">
      <Tiltable speed={500}>
        <Base {...props} />
      </Tiltable>
    </Floatable>
  </StyledTranslateDownOnClick>
);

const DownloadNow = (props) => (
  <FloatyTiltyButton {...props}>Download Now!</FloatyTiltyButton>
);

const TryInBrowser = (props) => (
  <FloatyTiltyButton {...props}>Try in Browser!</FloatyTiltyButton>
);

export { DownloadNow, TryInBrowser, Base, FloatyTiltyButton };
