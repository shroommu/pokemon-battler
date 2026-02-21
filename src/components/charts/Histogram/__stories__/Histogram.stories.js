import Histogram from "./Histogram";

const sampleBins = [
  { x0: 0, x1: 10, length: 4 },
  { x0: 10, x1: 20, length: 8 },
  { x0: 20, x1: 30, length: 13 },
  { x0: 30, x1: 40, length: 9 },
  { x0: 40, x1: 50, length: 5 },
];

const meta = {
  title: "UI/06 Charts/Histogram",
  component: Histogram,
  tags: ["autodocs"],
  args: {
    width: 700,
    height: 360,
    bins: sampleBins,
    barPadding: 2,
    barFillColor: "#3b82f6",
  },
};

export default meta;

export const Default = {};

export const DenseBins = {
  args: {
    bins: [
      { x0: 0, x1: 5, length: 2 },
      { x0: 5, x1: 10, length: 4 },
      { x0: 10, x1: 15, length: 6 },
      { x0: 15, x1: 20, length: 8 },
      { x0: 20, x1: 25, length: 10 },
      { x0: 25, x1: 30, length: 12 },
      { x0: 30, x1: 35, length: 9 },
      { x0: 35, x1: 40, length: 7 },
      { x0: 40, x1: 45, length: 5 },
      { x0: 45, x1: 50, length: 3 },
    ],
  },
};
