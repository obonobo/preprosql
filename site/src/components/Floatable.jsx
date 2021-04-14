import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = (distance, animation, speed) =>
  makeStyles(() => ({
    floater: {
      animation:
        animation || `${speed || 4000}ms ease-in-out 0s infinite $floating`,
    },
    "@keyframes floating": {
      "0%": { transform: "translateY(0em)" },
      "50%": { transform: `translateY(${distance || "0.6em"})` },
      "100%": { transform: "translateY(0em)" },
    },
  }))();

export default function Floatable({
  className,
  animation,
  distance,
  children,
  classes,
  speed,
  ...props
}) {
  const cls = classes || useStyles(distance, animation, speed);
  return (
    <div className={clsx(cls.floater || "", className || "")} {...props}>
      {children}
    </div>
  );
}
