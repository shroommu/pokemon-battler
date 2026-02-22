import Dropdown from "../Dropdown";

const menuItems = (
  <div className="w-56">
    <button className="p-2 text-left hover:bg-gray-100">Sort by HP</button>
    <button className="p-2 text-left hover:bg-gray-100">Sort by Attack</button>
    <button className="p-2 text-left hover:bg-gray-100">Sort by Speed</button>
    <button className="p-2 text-left hover:bg-gray-100">Sort by Defense</button>
  </div>
);

const meta = {
  title: "UI/03 Interactive/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    buttonText: "Open Filters",
    buttonType: "secondary",
    testId: "filters-dropdown",
    children: menuItems,
  },
};

export default meta;

export const Default = {};
