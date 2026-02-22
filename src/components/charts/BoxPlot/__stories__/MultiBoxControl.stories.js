import { useState } from "react";

import MultiBoxControl from "../MultiBoxControl";

const filterList = ["Fire", "Water", "Grass"];

const meta = {
  title: "UI/03 Interactive/Chart Primitives/MultiBoxControl",
  component: MultiBoxControl,
  tags: ["autodocs"],
  render: () => {
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
  },
};

export default meta;

export const Default = {};
