export default function MultiBoxControl({ filterList, onChange }) {
  const onChangeHandler = (filterName, filterChecked) => {
    console.log(filterName, filterChecked);
  };

  return (
    <div
      data-testid="boxplot-controls-container"
      className="ml-2 p-4 bg-white h-full"
    >
      <ul>
        {filterList.map((filterItem) => {
          return (
            <li key={filterItem} data-testid={`${filterItem}-filter`}>
              <input
                type="checkbox"
                name={filterItem}
                onChange={(event) =>
                  onChangeHandler(event.target.name, event.target.checked)
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
