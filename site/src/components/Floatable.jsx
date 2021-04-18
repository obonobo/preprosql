import styled from "styled-components";

const Root = styled.div`
  animation: ${({ animation, speed }) =>
    animation || `${speed || 4000}ms ease-in-out 0s infinite floating`};

  @keyframes floating {
      0% { transform: "translateY(0em)"; }
     50% { transform: ${({ distance }) => `translateY(${distance || "0.6em"})`}; }
    100% { transform: "translateY(0em)"; }
  }
`;

export default function Floatable({
  className,
  animation,
  distance,
  children,
  speed,
  ...props
}) {
  return (
    <Root className={className} {...props}>
      {children}
    </Root>
  );
}
