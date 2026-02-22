export default function ChartFrame({ title, subtitle, children }) {
  return (
    <div className="flex h-full w-full flex-col" data-testid="chart-frame">
      {(title || subtitle) && (
        <header className="mb-3" data-testid="chart-frame-header">
          {title && (
            <h3 className="text-base font-semibold leading-tight" data-testid="chart-frame-title">
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
    </div>
  );
}
