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

export const GradientFill = {
  args: {
    barFill: "url(#horizontal-item-gradient)",
  },
  render: (args) => (
    <svg width={240} height={120} className="border">
      <defs>
        <linearGradient id="horizontal-item-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <HorizontalBarItem {...args} />
    </svg>
  ),
};
