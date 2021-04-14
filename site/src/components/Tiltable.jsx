import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useRef } from "react";

const useStyles = makeStyles(() => ({
  tiltable: {
    perspective: "1000px",
    willChange: "transform",
    transition: (speed) =>
      `transform ${speed || 400}ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s`,
    transform: "scale3d(1, 1, 1)",
  },
}));

export default function Tiltable({
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  className,
  children,
  classes,
  speed,
  degX,
  degY,
  deg,
  ...props
}) {
  const cls = classes || useStyles(speed);

  const tilty = useRef(null);
  const dg = { x: deg || degX || 10, y: deg || degY || 12 };
  const calcDeg = (d, p) => 2 * d * p - d;

  const tilt = (e) => {
    if (tilty.current === null) return;

    const rect = tilty.current.getBoundingClientRect();
    const proportion = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };

    tilty.current.style.transform = `
      rotateX(${calcDeg(dg.x, proportion.x)}deg)
      rotateY(${-calcDeg(dg.y, proportion.y)}deg)
      scale3d(1, 1, 1)
    `;
  };

  const untilt = () => {
    if (tilty.current === null) return;
    tilty.current.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <div
      ref={tilty}
      className={clsx(cls.tiltable || "", className || "")}
      onMouseEnter={(e) => {
        tilt(e);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        untilt();
        if (onMouseLeave) onMouseLeave(e);
      }}
      onMouseMove={(e) => {
        tilt(e);
        if (onMouseMove) onMouseMove(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
