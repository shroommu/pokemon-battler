export const Skeleton = ({ className, testId = "skeleton-loader" }) => (
  <div
    aria-live="polite"
    aria-busy="true"
    className={className}
    data-testid={testId}
  >
    <span
      className="inline-flex h-full w-full animate-pulse select-none rounded-md bg-gray-300 leading-none"
      data-testid={`${testId}-inner`}
    ></span>
  </div>
);

export const SVGSkeleton = ({ className, testId = "svg-skeleton-loader" }) => (
  <svg
    className={className + " animate-pulse rounded bg-gray-300"}
    data-testid={testId}
  />
);
