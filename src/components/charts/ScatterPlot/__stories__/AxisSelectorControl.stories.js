import { useState } from "react";

import AxisSelectorControl from "../AxisSelectorControl";

const axisOptions = ["hp", "attack", "defense", "speed"];

const meta = {
  title: "UI/03 Interactive/Chart Primitives/AxisSelectorControl",
  component: AxisSelectorControl,
  tags: ["autodocs"],
  args: {
    axisOptions,
    xAxisKey: "attack",
    yAxisKey: "speed",
  },
  render: (args) => {
    const [xAxisKey, setXAxisKey] = useState(args.xAxisKey);
    const [yAxisKey, setYAxisKey] = useState(args.yAxisKey);

    return (
      <AxisSelectorControl
        axisOptions={args.axisOptions}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        onXAxisChange={setXAxisKey}
        onYAxisChange={setYAxisKey}
      />
    );
  },
};

export default meta;

export const Default = {};

export const WithLabelFormatter = {
  render: (args) => {
    const [xAxisKey, setXAxisKey] = useState(args.xAxisKey);
    const [yAxisKey, setYAxisKey] = useState(args.yAxisKey);

    return (
      <AxisSelectorControl
        axisOptions={args.axisOptions}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        onXAxisChange={setXAxisKey}
        onYAxisChange={setYAxisKey}
        axisLabelFormatter={(axisKey) =>
          axisKey.charAt(0).toUpperCase() + axisKey.slice(1)
        }
      />
    );
  },
};
