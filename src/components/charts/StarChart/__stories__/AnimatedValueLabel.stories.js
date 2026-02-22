import AnimatedValueLabel from "../AnimatedValueLabel";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/AnimatedValueLabel",
  component: AnimatedValueLabel,
  tags: ["autodocs"],
  args: {
    centerX: 100,
    centerY: 100,
    x: 100,
    y: 24,
    value: 88,
  },
  render: (args) => (
    <svg width={220} height={220} className="border">
      <AnimatedValueLabel {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
