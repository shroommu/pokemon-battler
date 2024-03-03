export default function LabeledElement({
  children,
  childId,
  data-testid,
  containerTwExtraClasses,
  label,
  required,
  error,
}) {
  return (
    <div className={`flex flex-col ${containerTwExtraClasses}`}>
      <label className="pb-2" for={childId} data-testid={data-testid}>
        {label}
        {required && "*"}
      </label>
      {children}
      <div className="pt-1 text-red-500">{error}</div>
    </div>
  );
}
