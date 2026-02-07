import { max, min, quantile } from "d3";

export const getBoxplotData = (dataPoints, valueKey) => {
  const values = dataPoints.map((dataPoint) => dataPoint[valueKey]);

  const minValue = min(values);
  const q1 = quantile(values, 0.25);
  const mean = quantile(values, 0.5);
  const q3 = quantile(values, 0.75);
  const maxValue = max(values);
  const iqr = q3 - q1;
  const lowerOutlierBounds = Math.max(minValue, q1 - iqr * 1.5);
  const upperOutlierBounds = Math.min(maxValue, q3 + iqr * 1.5);

  const outliers = dataPoints.filter(
    (dataPoint) =>
      dataPoint.value < lowerOutlierBounds ||
      dataPoint.value > upperOutlierBounds,
  );

  const data = {
    dataPoints,
    min: lowerOutlierBounds,
    q1,
    mean,
    q3,
    max: upperOutlierBounds,
    outliers,
  };

  return data;
};
