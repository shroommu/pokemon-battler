import { bin } from "d3";

export const getHistogramData = (dataPoints, valueKey) => {
  const bins = bin().value((dataPoint) => dataPoint[valueKey])(dataPoints);

  return bins;
};
