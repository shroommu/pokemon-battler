import { useId } from "react";

export default function ChartFrame({ title, subtitle, children, ariaLabel }) {
  const titleId = useId().replace(/[:]/g, "");
  const hasHeader = Boolean(title || subtitle);
  const labelledBy = title ? titleId : undefined;
  const resolvedAriaLabel = labelledBy ? undefined : ariaLabel || subtitle || "Chart";

  return (
    <section
      className="flex h-full w-full flex-col"
      data-testid="chart-frame"
      role="region"
      aria-labelledby={labelledBy}
      aria-label={resolvedAriaLabel}
    >
      {hasHeader && (
        <header className="mb-3" data-testid="chart-frame-header">
          {title && (
            <h3
              id={titleId}
              className="text-base font-semibold leading-tight"
              data-testid="chart-frame-title"
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600" data-testid="chart-frame-subtitle">
              {subtitle}
            </p>
          )}
        </header>
      )}
      <div className="min-h-0 flex-1" data-testid="chart-frame-content">
        {children}
      </div>
    </section>
  );
}
