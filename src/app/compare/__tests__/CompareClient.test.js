import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CompareClient from "../CompareClient";

const replaceMock = jest.fn();
let pathnameMock = "/compare";
let searchParamsMock = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => pathnameMock,
  useSearchParams: () => searchParamsMock,
}));

const options = [
  { id: "001", name: "Bulbasaur", pokedexNumber: 1 },
  { id: "004", name: "Charmander", pokedexNumber: 4 },
];

describe("CompareClient", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    pathnameMock = "/compare";
    searchParamsMock = new URLSearchParams();
  });

  it("renders controlled selectors", () => {
    render(<CompareClient pokemonOptions={options} />);

    expect(screen.getByTestId("compare-pokemon-a-select")).toHaveValue("");
    expect(screen.getByTestId("compare-pokemon-b-select")).toHaveValue("");
    expect(screen.getByTestId("compare-panel-state")).toHaveTextContent(
      "Select two Pokemon"
    );
  });

  it("syncs Pokemon A selection to query params", async () => {
    const user = userEvent.setup();
    render(<CompareClient pokemonOptions={options} />);

    await user.selectOptions(screen.getByTestId("compare-pokemon-a-select"), "bulbasaur");

    expect(replaceMock).toHaveBeenCalledWith("/compare?a=bulbasaur");
  });

  it("preserves existing selection when setting Pokemon B", async () => {
    const user = userEvent.setup();
    searchParamsMock = new URLSearchParams("a=bulbasaur");
    render(<CompareClient pokemonOptions={options} />);

    await user.selectOptions(screen.getByTestId("compare-pokemon-b-select"), "charmander");

    expect(replaceMock).toHaveBeenCalledWith("/compare?a=bulbasaur&b=charmander");
  });

  it("prevents duplicate selection on change", async () => {
    const user = userEvent.setup();
    searchParamsMock = new URLSearchParams("b=bulbasaur");
    render(<CompareClient pokemonOptions={options} />);

    await user.selectOptions(screen.getByTestId("compare-pokemon-a-select"), "bulbasaur");

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("shows duplicate warning state when URL contains matching a and b", () => {
    searchParamsMock = new URLSearchParams("a=bulbasaur&b=bulbasaur");
    render(<CompareClient pokemonOptions={options} />);

    expect(screen.getByTestId("compare-duplicate-warning")).toBeInTheDocument();
  });

  it("disables duplicate options across selectors", () => {
    render(<CompareClient pokemonOptions={options} initialB="bulbasaur" />);

    expect(
      screen.getByTestId("compare-pokemon-a-select").querySelector('option[value="bulbasaur"]')
    ).toBeDisabled();
  });
});
