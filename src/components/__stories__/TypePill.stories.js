import TypePill from "./TypePill";

const meta = {
  title: "UI/01 Primitives/TypePill",
  component: TypePill,
  tags: ["autodocs"],
  args: {
    typeName: "Fire",
    compact: false,
  },
};

export default meta;

export const Standard = {};

export const Compact = {
  args: {
    compact: true,
  },
};

export const Water = {
  args: {
    typeName: "Water",
  },
};
