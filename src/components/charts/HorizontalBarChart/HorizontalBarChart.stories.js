import HorizontalBarChart from "./HorizontalBarChart";

const sampleData = [
  {
    name: "HP",
    value: 65,
    referenceLine: 70,
    tooltipText: "Value: ",
    referenceLineTooltipText: "Reference: ",
  },
  {
    name: "Attack",
    value: 80,
    referenceLine: 75,
    tooltipText: "Value: ",
    referenceLineTooltipText: "Reference: ",
  },
  {
    name: "Defense",
    value: 70,
    referenceLine: 72,
    tooltipText: "Value: ",
    referenceLineTooltipText: "Reference: ",
  },
  {
    name: "Speed",
    value: 95,
    referenceLine: 85,
    tooltipText: "Value: ",
    referenceLineTooltipText: "Reference: ",
  },
];

const meta = {
  title: "UI/06 Charts/HorizontalBarChart",
  component: HorizontalBarChart,
  tags: ["autodocs"],
  args: {
    width: 700,
    height: 380,
    data: sampleData,
    showReferenceLine: true,
    barFillColor: "#22c55e",
    referenceLineFillColor: "#ef4444",
  },
};

export default meta;

export const Default = {};

export const FixedDomain = {
  args: {
    fixedDomainMax: 120,
  },
};
