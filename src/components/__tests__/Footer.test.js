import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

jest.mock("next/link", () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("Footer", () => {
  it("renders sitemap and credits", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer-body")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Pokedex")).toHaveAttribute("href", "/pokedex/");
    expect(screen.getByText("About")).toHaveAttribute("href", "/about/");
  });
});
