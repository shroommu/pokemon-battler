import { render, screen } from "@testing-library/react";
import Home, { revalidate } from ".././page";

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

jest.mock("@/services/getUniquePokemonByNumber", () => ({
  getUniquePokemonByNumber: jest.fn(),
}));

import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

describe("Home page", () => {
  it("renders pokemon of the day content", async () => {
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Pikachu",
        sprite_front_filepath: "/images/pokemon/sprites/front/pikachu.png",
      },
    });

    render(await Home());

    expect(screen.getByTestId("professor-oak-container")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-of-the-day-link")).toHaveAttribute(
      "href",
      "/pokedex/pikachu"
    );
    expect(screen.getByTestId("pokemon-image")).toBeInTheDocument();
    expect(screen.getByTestId("professor-oak-image")).toBeInTheDocument();
    expect(revalidate).toBe(86400);
  });
});
