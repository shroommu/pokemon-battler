import HistogramBar from "../HistogramBar";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/HistogramBar",
  component: HistogramBar,
  tags: ["autodocs"],
  args: {
    bin: { x0: 10, x1: 20, length: 8 },
    index: 0,
    x: 20,
    y: 30,
    barWidth: 70,
    barHeight: 140,
    barFillColor: "#2563eb",
    showTooltip: () => {},
    setInteractionData: () => {},
  },
  render: (args) => (
    <svg width={180} height={200} className="border">
      <HistogramBar {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
