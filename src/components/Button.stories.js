import Button from "./Button";

const meta = {
  title: "UI/01 Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Catch Pokemon",
    type: "primary",
    disabled: false,
  },
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: {
    type: "secondary",
    children: "View Team",
  },
};

export const Tertiary = {
  args: {
    type: "tertiary",
    children: "Learn More",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: "Unavailable",
  },
};
