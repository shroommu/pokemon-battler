import AnimatedStar from "../AnimatedStar";

const starPoints = [
  { x: 5, y: 1 },
  { x: 9, y: 3 },
  { x: 7.5, y: 8 },
  { x: 2.5, y: 8 },
  { x: 1, y: 3 },
];

const meta = {
  title: "UI/03 Interactive/Chart Primitives/AnimatedStar",
  component: AnimatedStar,
  tags: ["autodocs"],
  args: {
    fill: "#3b82f6",
    starPoints,
  },
  render: (args) => (
    <svg width={220} height={220} viewBox="0 0 10 10" className="border">
      <AnimatedStar {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
