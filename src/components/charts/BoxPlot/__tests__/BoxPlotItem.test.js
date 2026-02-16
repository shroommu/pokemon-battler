import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BoxPlotItem from ".././BoxPlotItem";

describe("BoxPlotItem", () => {
  it("renders box plot geometry and point interaction callbacks", async () => {
    const setInteractionData = jest.fn();
    const user = userEvent.setup();

    const { container, getByTestId } = render(
      <svg>
        <BoxPlotItem
          data={{
            min: 10,
            q1: 20,
            mean: 30,
            q3: 40,
            max: 100,
            dataPoints: [
              { name: "A", max_stats: 25, tooltip: <div>A tooltip</div> },
              { name: "B", max_stats: 50, tooltip: <div>B tooltip</div> },
            ],
          }}
          valueKey="max_stats"
          width={200}
          height={20}
          yPos={30}
          fillColor="#abc"
          setInteractionData={setInteractionData}
          tooltipOffset={10}
        />
      </svg>
    );

    expect(getByTestId("quantile-box")).toBeInTheDocument();
    expect(getByTestId("mean-line")).toBeInTheDocument();

    const point = container.querySelector("circle[data-testid='A']");
    await user.hover(point);
    expect(setInteractionData).toHaveBeenCalled();
    await user.unhover(point);
    expect(setInteractionData).toHaveBeenLastCalledWith(null);
    await user.click(point);
    expect(setInteractionData).toHaveBeenCalled();
  });
});
