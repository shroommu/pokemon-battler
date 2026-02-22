import { useState } from "react";

import AxisSelectorControl from "../AxisSelectorControl";

const axisOptions = ["hp", "attack", "defense", "speed"];

function InteractiveAxisSelectorControl({ args, axisLabelFormatter }) {
  const [xAxisKey, setXAxisKey] = useState(args.xAxisKey);
  const [yAxisKey, setYAxisKey] = useState(args.yAxisKey);

  return (
    <AxisSelectorControl
      axisOptions={args.axisOptions}
      xAxisKey={xAxisKey}
      yAxisKey={yAxisKey}
      onXAxisChange={setXAxisKey}
      onYAxisChange={setYAxisKey}
      axisLabelFormatter={axisLabelFormatter}
    />
  );
}

const meta = {
  title: "UI/03 Interactive/Chart Primitives/AxisSelectorControl",
  component: AxisSelectorControl,
  tags: ["autodocs"],
  args: {
    axisOptions,
    xAxisKey: "attack",
    yAxisKey: "speed",
  },
  render: (args) => <InteractiveAxisSelectorControl args={args} />,
};

export default meta;

export const Default = {};

export const WithLabelFormatter = {
  render: (args) => (
    <InteractiveAxisSelectorControl
      args={args}
      axisLabelFormatter={(axisKey) =>
        axisKey.charAt(0).toUpperCase() + axisKey.slice(1)
      }
    />
  ),
};
