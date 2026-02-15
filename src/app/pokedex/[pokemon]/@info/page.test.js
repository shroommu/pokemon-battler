jest.mock("@/services/getUniquePokemonByName", () => ({
  getUniquePokemonByName: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { notFound } from "next/navigation";
import Page from "./page";

describe("@info page", () => {
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
});
