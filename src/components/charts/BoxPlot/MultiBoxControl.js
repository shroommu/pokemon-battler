export default function MultiBoxControl({
  filterList,
  activeFilters,
  onChange,
  innerRef,
}) {
  const sanitizeForId = (value) => value.toLowerCase().replace(/[^a-z0-9-]/g, "-");

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
      className="flex lg:ml-2 p-4 bg-white justify-center lg:justify-start"
      ref={innerRef}
    >
      <fieldset>
        <legend className="sr-only">Filter categories</legend>
        <ul className="flex flex-row flex-wrap justify-center lg:flex-col">
          <li className="flex flex-col items-center ml-2 lg:flex-row lg:ml-0">
            <input
              id="boxplot-filter-all"
              type="checkbox"
              name="All"
              checked={activeFilters.All}
              onChange={(event) =>
                event.target.checked ? setAllActive() : setAllInactive()
              }
            />
            <label className="lg:ml-2" htmlFor="boxplot-filter-all">
              All
            </label>
          </li>
          {filterList.map((filterItem) => {
            const filterId = `boxplot-filter-${sanitizeForId(filterItem)}`;

            return (
              <li
                key={filterItem}
                data-testid={`${filterItem}-filter`}
                className="flex flex-col items-center ml-2 lg:flex-row lg:ml-0"
              >
                <input
                  id={filterId}
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
                <label className="lg:ml-2" htmlFor={filterId}>
                  {filterItem}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
