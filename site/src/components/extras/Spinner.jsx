import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  place-content: center;
  place-items: center;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Progress = styled(CircularProgress)`
  height: 5em;
  width: 5em;
`;

export default function Spinner() {
  return (
    <Container>
      <Progress color="secondary" />
    </Container>
  );
}
