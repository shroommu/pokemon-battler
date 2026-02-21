import HorizontalBarItem from "./HorizontalBarItem";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/HorizontalBarItem",
  component: HorizontalBarItem,
  tags: ["autodocs"],
  args: {
    testId: "story-horizontal-bar-item",
    name: "Attack",
    value: 80,
    barHeight: 34,
    barWidth: 160,
    barColor: "#22c55e",
    x: 20,
    y: 30,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  },
  render: (args) => (
    <svg width={240} height={120} className="border">
      <HorizontalBarItem {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
