import { render, screen } from "@testing-library/react";
import PokedexButton from "./pokedexButton";

jest.mock("next/image", () => {
  return ({ fill, priority, unoptimized, ...props }) => <img {...props} />;
});

jest.mock("next/link", () => {
  return ({ children, href, prefetch, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("PokedexButton", () => {
  it("renders pokemon details and link", () => {
    render(
      <PokedexButton
        href="/pokedex/mr-mime"
        selected
        pokemon={{
          name: "Mr Mime",
          pokedex_number: 122,
          sprite_party_filepath: "/images/pokemon/sprites/party/mr-mime.png",
        }}
      />
    );

    expect(screen.getByTestId("mr-mime-link")).toHaveAttribute(
      "href",
      "/pokedex/mr-mime"
    );
    expect(screen.getByText("#122")).toBeInTheDocument();
    expect(screen.getByText("Mr Mime")).toBeInTheDocument();
  });
});
