export default function AxisSelectorControl({
  axisOptions,
  xAxisKey,
  yAxisKey,
  onXAxisChange,
  onYAxisChange,
}) {
  return (
    <div
      data-testid="scatter-plot-axis-selector-control"
      className="flex flex-wrap gap-3 items-center lg:ml-2 p-4 justify-center lg:justify-start"
    >
      <label className="flex items-center gap-2" data-testid="scatter-plot-x-axis-control">
        <span className="text-sm">X Axis</span>
        <select
          value={xAxisKey}
          onChange={(event) => onXAxisChange(event.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {axisOptions.map((axisKey) => (
            <option key={axisKey} value={axisKey}>
              {axisKey}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2" data-testid="scatter-plot-y-axis-control">
        <span className="text-sm">Y Axis</span>
        <select
          value={yAxisKey}
          onChange={(event) => onYAxisChange(event.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {axisOptions.map((axisKey) => (
            <option key={axisKey} value={axisKey}>
              {axisKey}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
