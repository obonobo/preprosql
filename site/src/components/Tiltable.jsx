import { useRef } from "react";
import styled from "styled-components";

const TiltyContainer = styled.div`
  perspective: "1000px";
  will-change: transform;
  transition: ${({ $speed }) =>
    `transform ${$speed || 400}ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s`};
  transform: scale3d(1, 1, 1);
`;

export default function Tiltable({
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  className,
  children,
  speed,
  degX,
  degY,
  deg,
  ...props
}) {
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
    <TiltyContainer
      ref={tilty}
      className={className}
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
    </TiltyContainer>
  );
}
