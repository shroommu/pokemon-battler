jest.mock("@/services/getUniquePokemonByName", () => ({
  getUniquePokemonByName: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

jest.mock(".", () => jest.fn(() => null));

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { notFound } from "next/navigation";
import Page from "./page";

describe("stats page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls notFound when pokemon cannot be resolved", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({ data: null });

    await expect(Page({ params: { pokemon: "missingno" } })).rejects.toThrow(
      "NOT_FOUND"
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("returns pokemon data entry keyed by id when id exists", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({
      data: { id: 25, name: "Pikachu" },
    });

    const element = await Page({ params: { pokemon: "pikachu" } });

    expect(element.key).toBe("25");
  });

  it("falls back to name for key when id is not present", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({
      data: { id: null, name: "Missingno" },
    });

    const element = await Page({ params: { pokemon: "missingno" } });

    expect(element.key).toBe("Missingno");
  });
});
