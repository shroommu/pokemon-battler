export default function LabeledElement({
  children,
  childId,
  testId,
  containerTwExtraClasses,
  label,
  required,
  error,
}) {
  return (
    <div className={`flex flex-col ${containerTwExtraClasses ?? ""}`}>
      <label className="pb-2" htmlFor={childId} data-testid={`${testId}-label`}>
        {label}
        {required && <div className="inline text-red-500 ml-1">*</div>}
      </label>
      {children}
      <div className="pt-1 text-red-500">{error}</div>
    </div>
  );
}
