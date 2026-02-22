import HorizontalBarReferenceLine from "../HorizontalBarReferenceLine";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/HorizontalBarReferenceLine",
  component: HorizontalBarReferenceLine,
  tags: ["autodocs"],
  args: {
    testId: "story-horizontal-reference-line",
    value: 75,
    barHeight: 34,
    barWidth: 8,
    color: "#ef4444",
    x: 140,
    y: 30,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  },
  render: (args) => (
    <svg width={240} height={120} className="border">
      <HorizontalBarReferenceLine {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
