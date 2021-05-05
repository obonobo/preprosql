import { useState } from "react";
import styled from "styled-components";

const PropsDemo = ({ text, name }) => <div>{`${text} ${name}`}</div>;

const Scratch = (props): JSX.Element => {
  const [text, setState] = useState("Hi ");

  return (
    <div>
      <PropsDemo text={text} name="Amine" />
      <button
        type="button"
        onClick={() =>
          setState((currentState) =>
            currentState === "Hi " ? "Amine " : "Hi "
          )
        }
      >
        Update State
      </button>
    </div>
  );
};

export default Scratch;
