"use server";

import { cache } from "react";

export const getBoxplotData = cache(async (dataPoints) => {
  const data = {
    leftOutliers: [],
    leftWhisker: 0.05,
    q1: 0.25,
    mean: 0.5,
    q2: 0.75,
    rightWhisker: 0.95,
    rightOutliers: [],
  };

  return { data };
});
