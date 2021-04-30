/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled from "styled-components";
import AppNameHeader from "./AppNameHeader";
import { StoreContextProvider } from "./StoreContext";
import WhatNeedsToBeDone from "./WhatNeedsToBeDone";

const Root = styled.div`
  width: min-content;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  place-content: center;
  text-align: center;
`;

export default function Todo() {
  return (
    <Root>
      <StoreContextProvider>
        <AppNameHeader />
        <WhatNeedsToBeDone />
      </StoreContextProvider>
    </Root>
  );
}
