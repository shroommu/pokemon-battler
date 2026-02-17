import { bin } from "d3";

export const getHistogramData = (dataPoints, valueKey) => {
  const bins = bin().value((dataPoint) => dataPoint[valueKey])(dataPoints);

  return bins.map((histogramBin) => ({
    x0: histogramBin.x0,
    x1: histogramBin.x1,
    length: histogramBin.length,
    values: [...histogramBin],
  }));
};
