import { Skeleton, SVGSkeleton } from "../LoadingIndicators";

const meta = {
  title: "UI/02 Composed/LoadingIndicators",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;

export const CardSkeleton = {
  args: {
    className: "h-16 w-64 rounded-md",
  },
};

export const ChartSkeleton = {
  render: () => <SVGSkeleton className="h-52 w-full" />,
};
