import Tooltip from "./Tooltip";

const meta = {
  title: "UI/03 Interactive/Chart Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    position: "top",
    interactionData: {
      xPos: 180,
      yPos: 120,
      children: (
        <div>
          <div>Bulbasaur</div>
          <div>HP: 45</div>
        </div>
      ),
    },
  },
  render: (args) => (
    <div className="relative h-64 w-full border border-dashed border-gray-400">
      <Tooltip {...args} />
    </div>
  ),
};

export default meta;

export const Top = {};

export const Right = {
  args: {
    position: "right",
  },
};

export const Bottom = {
  args: {
    position: "bottom",
  },
};

export const Left = {
  args: {
    position: "left",
  },
};
