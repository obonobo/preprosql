import { Button } from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import { LiftedContext } from "../../util/contexts";
import defaultTheme from "../../util/styles";
import { urlFor } from "../../util/utils";
import TranslateDownOnClick from "../extras/TranslateDownOnClick";
import Floatable from "../floatytilty/Floatable";
import Tiltable from "../floatytilty/Tiltable";

const WebAssemblyBadge = styled.div.attrs({
  children: <img alt="WA" src={urlFor("/WebAssembly_Logo.svg")} />,
})`
  & {
    display: flex;
    place-content: center;
    place-items: center;

    border-radius: 20%;
    background: linear-gradient(45deg, #fffb00, #ff0000);

    width: 4em;
    height: 4em;
    padding: 0.2em;
    margin: 0.3em;

    box-shadow: ${({ theme }) => theme && theme.shadows.sparse};

    & > img {
      object-fit: contain;
      width: 3em !important;
    }
  }
`;

const CoolWebAssemblyBadge = styled(WebAssemblyBadge)`
  transform: rotate(-20deg);
  font-size: 0.35em;
  flex-shrink: 0;
  position: relative;
  z-index: 6000;
  top: 0;
  left: 90%;
`;

const Clickable = styled(TranslateDownOnClick).attrs({ distance: "0.1em" })`
  height: 80%;
  transform: translateY(-0.15em);

  & > * {
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

    & > * {
      font-size: 1.3em;
      text-transform: none;
      line-height: 1.2;
    }

    & > span {
      display: unset;
    }
  }
`;

const FloatyTiltyButton = (props) => {
  const { lifted } = useContext(LiftedContext);
  return (
    <Clickable>
      <Floatable distance={lifted ? "0.2em" : "0.5em"}>
        <Tiltable speed={500}>
          <CoolButton {...props} />
        </Tiltable>
      </Floatable>
    </Clickable>
  );
};

const TextContainer = styled.div`
  position: relative;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-49%, -39%);
`;

const DownloadNow = (props) => (
  <FloatyTiltyButton {...props}>Download Now!</FloatyTiltyButton>
);

const TryInBrowser = (props) => (
  <FloatyTiltyButton {...props}>
    <CoolWebAssemblyBadge />
    <TextContainer>Try in Browser!</TextContainer>
  </FloatyTiltyButton>
);

export { DownloadNow, TryInBrowser, CoolButton, FloatyTiltyButton };
