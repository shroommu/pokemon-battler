import VerticalBarItem from "./VerticalBarItem";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/VerticalBarItem",
  component: VerticalBarItem,
  tags: ["autodocs"],
  args: {
    testId: "story-vertical-bar-item",
    name: "Speed",
    value: 95,
    barOrigin: 180,
    barHeight: 120,
    barWidth: 48,
    barColor: "#3b82f6",
    x: 40,
    y: 60,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  },
  render: (args) => (
    <svg width={160} height={220} className="border">
      <VerticalBarItem {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
