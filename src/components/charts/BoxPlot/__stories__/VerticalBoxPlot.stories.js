import VerticalBoxPlot from "../VerticalBoxPlot";
import { getBoxplotData } from "@/utils/getBoxplotData";

const hpDataPoints = [
  { name: "bulbasaur", value: 45, tooltip: "Bulbasaur (HP 45)" },
  { name: "charmander", value: 39, tooltip: "Charmander (HP 39)" },
  { name: "squirtle", value: 44, tooltip: "Squirtle (HP 44)" },
  { name: "pikachu", value: 35, tooltip: "Pikachu (HP 35)" },
];

const attackDataPoints = [
  { name: "bulbasaur", value: 49, tooltip: "Bulbasaur (Atk 49)" },
  { name: "charmander", value: 52, tooltip: "Charmander (Atk 52)" },
  { name: "squirtle", value: 48, tooltip: "Squirtle (Atk 48)" },
  { name: "pikachu", value: 55, tooltip: "Pikachu (Atk 55)" },
];

const speedDataPoints = [
  { name: "bulbasaur", value: 45, tooltip: "Bulbasaur (Spd 45)" },
  { name: "charmander", value: 65, tooltip: "Charmander (Spd 65)" },
  { name: "squirtle", value: 43, tooltip: "Squirtle (Spd 43)" },
  { name: "pikachu", value: 90, tooltip: "Pikachu (Spd 90)" },
];

const data = {
  HP: {
    displayColor: "#60a5fa",
    data: getBoxplotData(hpDataPoints, "value"),
  },
  Attack: {
    displayColor: "#f97316",
    data: getBoxplotData(attackDataPoints, "value"),
  },
  Speed: {
    displayColor: "#22c55e",
    data: getBoxplotData(speedDataPoints, "value"),
  },
};

const meta = {
  title: "UI/06 Charts/BoxPlot/VerticalBoxPlot",
  component: VerticalBoxPlot,
  tags: ["autodocs"],
  args: {
    width: 760,
    height: 420,
    fixedDomainMax: 120,
    valueKey: "value",
    xLabel: "Base Stat",
    multi: false,
    filterList: ["HP", "Attack", "Speed"],
    data,
  },
};

export default meta;

export const Default = {};

export const MultiFilter = {
  args: {
    multi: true,
  },
};
