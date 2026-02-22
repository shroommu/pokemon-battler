import { createElement } from "react";
import "../src/app/globals.css";

const preview = {
  decorators: [
    (Story, context) => {
      const isChartStory = context.title?.includes("06 Charts");
      const style = isChartStory
        ? { minHeight: "560px", padding: "16px" }
        : { padding: "16px" };

      return createElement("div", { style }, createElement(Story));
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    options: {
      storySort: {
        order: ["UI", ["01 Primitives", "02 Composed", "03 Interactive", "04 Layout", "05 Data Display", "06 Charts"]],
      },
    },
  },
};

export default preview;
