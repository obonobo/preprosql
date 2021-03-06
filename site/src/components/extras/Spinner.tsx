import { CircularProgress } from "@material-ui/core";
import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  place-content: center;
  place-items: center;
  display: flex;
`;

const Progress = styled(CircularProgress).attrs({ color: "secondary" })`
  height: 5em;
  width: 5em;
`;

export default function Spinner(props: ComponentPropsWithoutRef<"div">) {
  return (
    <Container {...props}>
      <Progress />
    </Container>
  );
}
