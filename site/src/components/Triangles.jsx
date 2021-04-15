import { IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Triangulr from "triangulr";
import styles from "../../pages/index.module.scss";
import { assetPrefix } from "../utils";

const overlap = {
  position: "relative",
  top: 0,
  left: 0,
};

const useStyles = makeStyles(() => ({
  root: {
    ...overlap,
  },
  bg: {
    ...overlap,
    zIndex: 0,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  fg: {
    ...overlap,
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
}));

const colorGenerator = (path) => {
  const random = 32;
  const ratio = (path.x + path.y) / (path.cols + path.lines);
  const code = Math.floor(
    255 - ratio * (255 - random) - Math.random() * random
  ).toString(16);
  return `#${code}0055`;
};

const createTriangles = (w, h) => new Triangulr(w, h, 40, 20, colorGenerator);

const Tri = ({ w, h, button, ...props }) => {
  const classes = useStyles();
  const triangles = useRef(null);

  const populateBackground = () => {
    if (triangles.current) {
      const newTriangle = createTriangles(w, h);
      triangles.current.innerHTML = "";
      triangles.current.appendChild(newTriangle);
    }
  };

  const But = () => (
    <div className={styles.trianglesOverlay}>
      <IconButton
        className={styles.regenerate}
        onClick={populateBackground}
        style={{
          padding: "0.1em",
          margin: "1em",
        }}
      >
        <img
          alt="ok"
          src={`${assetPrefix}/ok.png`}
          style={{ border: "none", objectFit: "contain" }}
        />
      </IconButton>
    </div>
  );

  useEffect(populateBackground, [w, h]);
  return (
    <>
      <div className={classes.bg} ref={triangles} {...props} />
      {button ? <But /> : null}
    </>
  );
};

const Triangles = ({ children, className, button, ...props }) => {
  const classes = useStyles();
  const triangles = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const reapplyDimensions = () => {
    if (triangles.current) {
      setDimensions({
        width: triangles.current.clientWidth,
        height: triangles.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", reapplyDimensions);
    reapplyDimensions();
    return () => window.removeEventListener("resize", reapplyDimensions);
  }, []);

  return (
    <div ref={triangles} className={clsx(classes.root, className)} {...props}>
      <Tri w={dimensions.width} h={dimensions.height} button={button} />
      <div className={classes.fg}>{children}</div>
    </div>
  );
};

export default Triangles;
