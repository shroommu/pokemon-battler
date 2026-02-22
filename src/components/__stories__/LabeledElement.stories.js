import Input from "../Input";
import LabeledElement from "../LabeledElement";

const meta = {
  title: "UI/02 Composed/LabeledElement",
  component: LabeledElement,
  tags: ["autodocs"],
  args: {
    childId: "pokemon-name",
    testId: "pokemon-name",
    label: "Pokemon Name",
    required: false,
    error: "",
  },
  render: (args) => (
    <div className="w-80">
      <LabeledElement {...args}>
        <Input
          testId="storybook-labeled-element"
          type="text"
          value="Bulbasaur"
          onChange={() => {}}
        />
      </LabeledElement>
    </div>
  ),
};

export default meta;

export const Default = {};

export const RequiredWithError = {
  args: {
    required: true,
    error: "Pokemon name is required.",
  },
};
