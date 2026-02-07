export default function MultiBoxControl({
  filterList,
  activeFilters,
  onChange,
}) {
  const setAllActive = () => {
    onChange(
      Object.keys(activeFilters).reduce(
        (acc, curr) => ((acc[curr] = true), acc),
        {},
      ),
    );
  };

  const setAllInactive = () => {
    onChange(
      Object.keys(activeFilters).reduce(
        (acc, curr) => ((acc[curr] = false), acc),
        {},
      ),
    );
  };

  return (
    <div
      data-testid="boxplot-controls-container"
      className="ml-2 p-4 bg-white h-full"
    >
      <ul>
        <input
          type="checkbox"
          name={"All"}
          onChange={(event) =>
            event.target.checked ? setAllActive() : setAllInactive()
          }
        />
        <label className="ml-2">All</label>
        {filterList.map((filterItem) => {
          return (
            <li key={filterItem} data-testid={`${filterItem}-filter`}>
              <input
                type="checkbox"
                name={filterItem}
                checked={activeFilters[filterItem]}
                onChange={(event) =>
                  onChange({
                    ...activeFilters,
                    [filterItem]: event.target.checked,
                  })
                }
              />
              <label className="ml-2">{filterItem}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
