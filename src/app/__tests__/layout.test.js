import RootLayout, { metadata } from ".././layout";

jest.mock("@/components/Header", () => () => <div data-testid="header-mock" />);
jest.mock("@/components/Footer", () => () => <div data-testid="footer-mock" />);

describe("RootLayout", () => {
  it("returns html root element and metadata", () => {
    const element = RootLayout({ children: <div data-testid="child" /> });

    expect(element.type).toBe("html");
    expect(element.props.lang).toBe("en");
    expect(metadata.title).toBe("Pokemon");
  });
});
