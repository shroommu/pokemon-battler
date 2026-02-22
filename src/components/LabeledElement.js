export default function LabeledElement({
  children,
  childId,
  testId,
  containerTwExtraClasses,
  label,
  required,
  error,
}) {
  const errorMessageId = childId ? `${childId}-error` : undefined;
  const labelTestId = testId ? `${testId}-label` : undefined;

  return (
    <div className={`flex flex-col ${containerTwExtraClasses ?? ""}`}>
      <label className="pb-2" htmlFor={childId} data-testid={labelTestId}>
        {label}
        {required && (
          <>
            <span className="inline text-red-500 ml-1" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> required</span>
          </>
        )}
      </label>
      {children}
      <div
        id={errorMessageId}
        className="pt-1 text-red-500"
        role={error ? "alert" : undefined}
      >
        {error}
      </div>
    </div>
  );
}
