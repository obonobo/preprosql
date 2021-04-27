import { Button } from "@material-ui/core";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { LiftedContext } from "../../util/contexts";
import defaultTheme from "../../util/styles";
import { style as $ } from "../../util/utils";
import TranslateDownOnClick from "../extras/TranslateDownOnClick";
import Floatable from "../floatytilty/Floatable";
import Tiltable from "../floatytilty/Tiltable";
import { CoolWebAssemblyBadge } from "./web-assembly-badge/WebAssemblyBadge";

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
    padding: 0;
    border-radius: 0.5em;
    background-color: rgba(255, 255, 255, 0.1);

    & > * {
      font-size: 1.3em;
      text-transform: none;
      line-height: 1.2;
    }

    & > span {
      width: 100%;
      height: 100%;
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

const Text = styled.div`
  position: relative;
  height: 100%;
  inset: -50% auto auto 0;
  padding: 1em;
  box-sizing: border-box;
  transform: translate(0, -5%);
`;

const Contents = styled.div`
  height: 100%;
  width: 100%;
  flex-shrink: 0;
`;

const DownloadNow = (props: ComponentPropsWithoutRef<"div">) => (
  <FloatyTiltyButton {...props}>
    <Contents>
      <Text style={$`inset: unset;`}>Download Now!</Text>
    </Contents>
  </FloatyTiltyButton>
);

const TryInBrowserButtonContents = () => {
  const [hovering, setHovering] = useState(false);
  const hover = useCallback(() => setHovering(true), [setHovering]);
  const unhover = useCallback(() => setHovering(false), [setHovering]);
  return (
    <Contents onMouseOver={hover} onMouseEnter={hover} onMouseLeave={unhover}>
      <CoolWebAssemblyBadge hovering={hovering} />
      <Text>Try in Browser!</Text>
    </Contents>
  );
};

const TryInBrowser = (props: ComponentPropsWithoutRef<"div">) => (
  <FloatyTiltyButton {...props}>
    <TryInBrowserButtonContents />
  </FloatyTiltyButton>
);

export { DownloadNow, TryInBrowser, CoolButton, FloatyTiltyButton };
