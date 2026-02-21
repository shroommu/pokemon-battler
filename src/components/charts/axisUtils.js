export const roundUpToNearestTen = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 10;
  }

  return Math.ceil(numericValue / 10) * 10;
};
