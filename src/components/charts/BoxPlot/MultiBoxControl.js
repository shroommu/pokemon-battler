export default function MultiBoxControl({
  filterList,
  activeFilters,
  onChange,
  innerRef,
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
      className="flex ml-2 p-4 bg-white h-full justify-center lg:justify-start"
      ref={innerRef}
    >
      <ul className="flex flex-row flex-wrap justify-center lg:flex-col">
        <li className="flex flex-col items-center ml-2 lg:flex-row lg:ml-0">
          <input
            type="checkbox"
            name={"All"}
            onChange={(event) =>
              event.target.checked ? setAllActive() : setAllInactive()
            }
          />
          <label className="lg:ml-2">All</label>
        </li>
        {filterList.map((filterItem) => {
          return (
            <li
              key={filterItem}
              data-testid={`${filterItem}-filter`}
              className="flex flex-col items-center ml-2 lg:flex-row lg:ml-0"
            >
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
              <label className="lg:ml-2">{filterItem}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
