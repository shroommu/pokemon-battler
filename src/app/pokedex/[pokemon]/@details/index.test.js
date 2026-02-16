import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Details from "./index";

jest.mock("./components/moves", () => () => <div data-testid="moves-content" />);
jest.mock("./components/stats", () => () => <div data-testid="stats-content" />);
jest.mock("./components/PagePill", () => {
  return ({ text, onClick }) => (
    <button onClick={onClick} type="button">
      {text}
    </button>
  );
});

describe("Details tabs", () => {
  it("shows moves by default and toggles between tabs", async () => {
    const user = userEvent.setup();
    render(<Details pokemon={{ name: "Pikachu" }} />);

    expect(screen.getByTestId("moves-content")).toBeInTheDocument();
    expect(screen.queryByTestId("stats-content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Stats" }));
    expect(screen.getByTestId("stats-content")).toBeInTheDocument();
    expect(screen.queryByTestId("moves-content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Moves" }));
    expect(screen.getByTestId("moves-content")).toBeInTheDocument();
    expect(screen.queryByTestId("stats-content")).not.toBeInTheDocument();
  });
});
