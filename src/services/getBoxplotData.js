"use server";

import { max, min, quantile } from "d3";
import { cache } from "react";

export const getBoxplotData = cache(async (dataPoints) => {
  const values = dataPoints.map((dataPoint) => dataPoint.value);

  const minValue = min(values);
  const q1 = quantile(values, 0.25);
  const mean = quantile(values, 0.5);
  const q3 = quantile(values, 0.75);
  const maxValue = max(values);

  const data = {
    dataPoints,
    min: minValue,
    q1,
    mean,
    q3,
    max: maxValue,
    outliers: [],
  };

  return { data };
});
