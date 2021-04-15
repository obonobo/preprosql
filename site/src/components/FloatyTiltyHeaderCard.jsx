import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useCallback, useState } from "react";
import Floatable from "./Floatable";
import Tiltable from "./Tiltable";

const shakyDistance = 0.05;
const useStyles = makeStyles(() => ({
  root: {
    zIndex: 10000,
  },

  floaterContainer: {
    userSelect: "none",
    color: "red",
  },

  floater: {
    display: "flex",
    flexDirection: "column",
    placeItems: "center",

    background: "linear-gradient(45deg, #0040ff, #00bfff)",
    borderRadius: "1em",
    boxShadow: "0px 11px 67px -4px rgba(0, 0, 0, 0.6)",

    "& h1": { margin: "0px" },
    "& svg": { marginBottom: "0.3em" },
    "& img": { marginBottom: "0.5em" },
  },

  title: {
    color: "hsl(240, 100%, 20%)",
    fontSize: "8em",
    margin: 0,
    marginBottom: "0.1em",
    fontFamily:
      "'B612', Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",

    "& span": {
      color: "hsl(0, 100%, 30%)",
      fontFamily: "IBM Plex Serif",
    },
  },

  contents: {
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    padding: "0.5em 1.5em",
  },

  shaking: {
    animation: "200ms linear 0s infinite $shaky",
  },

  "@keyframes shaky": {
    "0%": { transform: `translate(-${shakyDistance}em, -${shakyDistance}em)` },
    "20%": { transform: `translate(${shakyDistance}em, ${shakyDistance}em)` },
    "40%": { transform: `translate(-${shakyDistance}em, ${shakyDistance}em)` },
    "80%": { transform: `translate(${shakyDistance}em, -${shakyDistance}em)` },
    "100%": {
      transform: `translate(-${shakyDistance}em, -${shakyDistance}em)`,
    },
  },
}));

const AppLogo = ({ className, ...props }) => (
  <h1 className={className} {...props}>
    PrePro
    <span>SQL</span>
  </h1>
);

const BuildBadge = ({ className, hovering, ...props }) => (
  <img
    alt="Build Badge"
    src="https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg"
    style={{ height: "2em" }}
    className={clsx({ [className]: hovering })}
    {...props}
  />
);

const Contents = ({ classes }) => {
  const [hovering, setHovering] = useState(false);
  const handleEnter = useCallback(() => setHovering(true), []);
  const handleLeave = useCallback(() => setHovering(false), []);

  return (
    <div
      className={classes.contents}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <AppLogo className={classes.title} />
      <BuildBadge hovering={hovering} className={classes.shaking} />
    </div>
  );
};

const FloatyTiltyHeaderCard = (props) => {
  const classes = useStyles();
  return (
    <a href="https://github.com/obonobo/preprosql" {...props}>
      <Floatable className={classes.floaterContainer}>
        <Tiltable className={classes.floater} speed={500}>
          <Contents classes={classes} />
        </Tiltable>
      </Floatable>
    </a>
  );
};

export default FloatyTiltyHeaderCard;
export { FloatyTiltyHeaderCard };
