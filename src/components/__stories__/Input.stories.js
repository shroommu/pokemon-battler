import { useState } from "react";

import Input from "../Input";

const meta = {
  title: "UI/01 Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    testId: "storybook-input",
    type: "text",
    value: "Pikachu",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);

    return (
      <div className="w-80">
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};

export default meta;

export const Text = {};

export const Password = {
  args: {
    type: "password",
    value: "secret123",
  },
};
