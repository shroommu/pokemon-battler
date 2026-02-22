import ScatterPlot from "../ScatterPlot";
import ChartFrame from "../../components/ChartFrame";

const sampleData = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    values: { hp: 45, attack: 49, defense: 49, speed: 45 },
    pointColor: "#22c55e",
  },
  {
    id: "charmander",
    name: "Charmander",
    values: { hp: 39, attack: 52, defense: 43, speed: 65 },
    pointColor: "#f97316",
  },
  {
    id: "squirtle",
    name: "Squirtle",
    values: { hp: 44, attack: 48, defense: 65, speed: 43 },
    pointColor: "#3b82f6",
  },
  {
    id: "pikachu",
    name: "Pikachu",
    values: { hp: 35, attack: 55, defense: 40, speed: 90 },
    pointColor: "#eab308",
  },
];

const meta = {
  title: "UI/06 Charts/ScatterPlot",
  component: ScatterPlot,
  tags: ["autodocs"],
  args: {
    width: 760,
    height: 420,
    data: sampleData,
    axisOptions: ["hp", "attack", "defense", "speed"],
    initialXAxisKey: "attack",
    initialYAxisKey: "speed",
  },
  render: (args) => (
    <ChartFrame
      title="Pokemon Stat Distribution"
      subtitle="Compare stat pairs across starter Pokemon"
    >
      <ScatterPlot {...args} />
    </ChartFrame>
  ),
};

export default meta;

export const Default = {};
