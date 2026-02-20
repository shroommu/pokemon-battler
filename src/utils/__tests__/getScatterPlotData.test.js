import { getScatterPlotData } from ".././getScatterPlotData";

describe("getScatterPlotData", () => {
  it("maps pokemon data into scatter plot points with numeric fallbacks", () => {
    const pokemonData = [
      {
        id: 25,
        name: "pikachu",
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
        max_stats: 90,
        primary_type: {
          name: "Electric",
          display_color: "#f7d02c",
        },
      },
      {
        id: 133,
        name: "eevee",
        hp: null,
        attack: undefined,
        defense: 50,
        speed: null,
        primary_type: {
          name: "Normal",
        },
      },
    ];

    expect(getScatterPlotData(pokemonData)).toEqual([
      {
        id: 25,
        name: "pikachu",
        hp: 35,
        attack: 55,
        defense: 40,
        special: 0,
        speed: 90,
        max_stats: 90,
        pointColor: "#f7d02c",
      },
      {
        id: 133,
        name: "eevee",
        hp: 0,
        attack: 0,
        defense: 50,
        special: 0,
        speed: 0,
        max_stats: 0,
        pointColor: "#aa9",
      },
    ]);
  });

  it("returns an empty array when no input is provided", () => {
    expect(getScatterPlotData()).toEqual([]);
  });
});
