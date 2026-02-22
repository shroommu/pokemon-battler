import { useState } from "react";

import MultiBoxControl from "../MultiBoxControl";

const filterList = ["Fire", "Water", "Grass"];

function InteractiveMultiBoxControl() {
  const [activeFilters, setActiveFilters] = useState({
    All: false,
    Fire: true,
    Water: false,
    Grass: false,
  });

  return (
    <MultiBoxControl
      filterList={filterList}
      activeFilters={activeFilters}
      onChange={setActiveFilters}
    />
  );
}

const meta = {
  title: "UI/03 Interactive/Chart Primitives/MultiBoxControl",
  component: MultiBoxControl,
  tags: ["autodocs"],
  render: () => <InteractiveMultiBoxControl />,
};

export default meta;

export const Default = {};
