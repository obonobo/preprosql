import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

describe("App", () => {

  it("renders without crashing", () => {
    render(<App />);
  });

  // it("has a brand name", () => {
  //   render(<App />);
  //   expect(screen.getByText("Hello World!")).toBeInTheDocument();
  // });
});
