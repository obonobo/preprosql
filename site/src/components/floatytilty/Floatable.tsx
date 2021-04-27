import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! Commenting out this because of the below issue:
// !!! https://github.com/styled-components/styled-components/issues/3125
// const Root = styled.div`
//   animation: ${({ animation, speed }) =>
//     animation || `${speed || 4000}ms ease-in-out 0s infinite floating`};
//
//   @keyframes floating {
//       0% { transform: "translateY(0em)"; }
//      50% { transform: ${({ distance }) => `translateY(${ distance || "0.6em" })`}; }
//     100% { transform: "translateY(0em)"; }
//   }
// `;

// !!! Below is an equivalent useStyles alternative

type AnimationSpec = {
  distance?: string;
  animation?: string;
  speed?: number;
};

const useStyles = ({ distance, animation, speed }: AnimationSpec) =>
  makeStyles({
    root: {
      animation:
        animation || `${speed || 4000}ms ease-in-out 0s infinite $floating`,
    },
    "@keyframes floating": {
      "0%": { transform: "translateY(0em)" },
      "50%": { transform: `translateY(${distance || "0.6em"})` },
      "100%": { transform: "translateY(0em)" },
    },
  })();

const Root = ({
  className,
  ...props
}: AnimationSpec & ComponentPropsWithoutRef<"div">) => (
  <div className={clsx(className, useStyles(props).root)} {...props} />
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default function Floatable({
  className,
  animation,
  distance,
  children,
  speed,
  ...props
}: AnimationSpec & ComponentPropsWithoutRef<"div">) {
  return (
    <Root
      className={className}
      distance={distance}
      animation={animation}
      speed={speed}
      {...props}
    >
      {children}
    </Root>
  );
}
