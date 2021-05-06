import styled from "styled-components";
import { fastTransition } from "./TodoItem";

const Root = styled.div`
  display: flex;
  place-content: center;
  height: 100%;
  width: 100%;
`;

const ClickableNumber = styled.span<{ $selected?: boolean }>`
  ${fastTransition}

  font-size: 1.3rem;
  margin-left: 0.7em;

  :hover {
    cursor: pointer;
    transform: scale(1.3) translate(0, 7%);
  }
`;

const PagePicker = ({
  page = 0,
  setPage = () => null,
  totalPages = 1,
  ...props
}: {
  page?: number;
  setPage?: (x: number) => void;
  totalPages?: number;
}): JSX.Element => (
  <Root {...props}>
    {[...Array(totalPages).keys()].map((val) => (
      <ClickableNumber
        key={val}
        $selected={val === page}
        onClick={() => setPage(val)}
      >
        {val}
      </ClickableNumber>
    ))}
  </Root>
);

export default PagePicker;
