import BoxPlotItem from "../BoxPlotItem";
import { getBoxplotData } from "@/utils/getBoxplotData";

const dataPoints = [
  { name: "bulbasaur", value: 45, tooltip: "Bulbasaur (45)" },
  { name: "charmander", value: 39, tooltip: "Charmander (39)" },
  { name: "squirtle", value: 44, tooltip: "Squirtle (44)" },
  { name: "pikachu", value: 35, tooltip: "Pikachu (35)" },
];

const boxPlotData = getBoxplotData(dataPoints, "value");

const meta = {
  title: "UI/03 Interactive/Chart Primitives/BoxPlotItem",
  component: BoxPlotItem,
  tags: ["autodocs"],
  args: {
    data: boxPlotData,
    valueKey: "value",
    width: 260,
    height: 48,
    yPos: 80,
    fillColor: "#60a5fa",
    tooltipOffset: 20,
    setInteractionData: () => {},
  },
  render: (args) => (
    <svg width={320} height={180} className="border">
      <BoxPlotItem {...args} />
    </svg>
  ),
};

export default meta;

export const Default = {};
