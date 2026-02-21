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

export const GradientFill = {
  args: {
    barFill: "url(#vertical-item-gradient)",
  },
  render: (args) => (
    <svg width={160} height={220} className="border">
      <defs>
        <linearGradient id="vertical-item-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <VerticalBarItem {...args} />
    </svg>
  ),
};
