jest.mock("d3", () => ({
  min: (arr) => Math.min(...arr),
  max: (arr) => Math.max(...arr),
  quantile: (arr, p) => {
    const values = [...arr].sort((a, b) => a - b);
    const index = (values.length - 1) * p;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return values[lower];
    const weight = index - lower;
    return values[lower] * (1 - weight) + values[upper] * weight;
  },
}));

import { getBoxplotData } from "./getBoxplotData";

describe("getBoxplotData", () => {
  it("returns quartile structure and outliers", () => {
    const points = [
      { value: 1, max_stats: 1 },
      { value: 2, max_stats: 2 },
      { value: 3, max_stats: 3 },
      { value: 4, max_stats: 4 },
      { value: 100, max_stats: 100 },
    ];

    const result = getBoxplotData(points, "max_stats");

    expect(result.dataPoints).toEqual(points);
    expect(result.min).toBeLessThanOrEqual(result.q1);
    expect(result.max).toBeGreaterThanOrEqual(result.q3);
    expect(result.outliers).toEqual([{ value: 100, max_stats: 100 }]);
  });
});
