import Menu from "../Menu";

const meta = {
  title: "UI/02 Composed/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    testId: "storybook-menu",
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Party Menu</h3>
        <button className="text-left underline">View Team</button>
        <button className="text-left underline">Manage Items</button>
      </div>
    ),
  },
};

export default meta;

export const Default = {};
