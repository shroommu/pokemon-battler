import { useState } from "react";

import ScatterPoint from "../ScatterPoint";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/ScatterPoint",
  component: ScatterPoint,
  tags: ["autodocs"],
  args: {
    cx: 80,
    cy: 80,
    radius: 8,
    fill: "#2563eb",
    stroke: "#ffffff",
    strokeWidth: 2,
  },
  render: (args) => {
    const [pulseTrigger, setPulseTrigger] = useState(0);

    return (
      <div className="flex flex-col gap-4">
        <button
          className="w-fit rounded border px-3 py-1"
          onClick={() => setPulseTrigger((previous) => previous + 1)}
        >
          Trigger pass-through pulse
        </button>
        <svg width={180} height={160} className="border">
          <ScatterPoint
            {...args}
            pulseTrigger={pulseTrigger}
            onMouseEnter={() => {}}
            onMouseMove={() => {}}
            onMouseLeave={() => {}}
            onClick={() => {}}
          />
        </svg>
      </div>
    );
  },
};

export default meta;

export const Default = {};
