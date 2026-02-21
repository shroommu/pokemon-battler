import StarChart from "./StarChart";

const statsData = [
  { name: "HP", value: 65, referenceLine: 60 },
  { name: "Attack", value: 80, referenceLine: 75 },
  { name: "Defense", value: 70, referenceLine: 68 },
  { name: "Special", value: 95, referenceLine: 85 },
  { name: "Speed", value: 110, referenceLine: 90 },
];

const meta = {
  title: "UI/06 Charts/StarChart",
  component: StarChart,
  tags: ["autodocs"],
  args: {
    width: 700,
    height: 420,
    data: statsData,
    fillColor: "#3b82f6",
    showReferenceStar: true,
    referenceStarFillColor: "#f97316",
  },
};

export default meta;

export const Default = {};

export const NoReferenceStar = {
  args: {
    showReferenceStar: false,
  },
};
