import VerticalBarReferenceLine from "./VerticalBarReferenceLine";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/VerticalBarReferenceLine",
  component: VerticalBarReferenceLine,
  tags: ["autodocs"],
  args: {
    testId: "story-vertical-reference-line",
    barHeight: 180,
    barWidth: 48,
    color: "#f97316",
    x: 40,
    y: 90,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  },
  render: (args) => (
    <svg width={160} height={220} className="border">
      <VerticalBarReferenceLine {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
