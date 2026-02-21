jest.mock("d3", () => ({
  bin: () => {
    const fn = () => {
      const firstBin = [{ max_stats: 10 }, { max_stats: 20 }];
      firstBin.x0 = 0;
      firstBin.x1 = 25;

      const secondBin = [{ max_stats: 50 }];
      secondBin.x0 = 25;
      secondBin.x1 = 75;

      return [firstBin, secondBin];
    };
    fn.value = () => fn;
    return fn;
  },
}));

import { getHistogramData } from ".././getHistogramData";

describe("getHistogramData", () => {
  it("returns serializable histogram bins", () => {
    const points = [{ max_stats: 10 }, { max_stats: 20 }, { max_stats: 50 }];
    const result = getHistogramData(points, "max_stats");

    expect(result).toEqual([
      {
        x0: 0,
        x1: 25,
        length: 2,
        values: [{ max_stats: 10 }, { max_stats: 20 }],
      },
      {
        x0: 25,
        x1: 75,
        length: 1,
        values: [{ max_stats: 50 }],
      },
    ]);
  });
});
