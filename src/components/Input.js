export default function Input({
  id,
  testId,
  value,
  onChange,
  type = "text",
  ...rest
}) {
  const resolvedTestId = testId ? `${testId}-input` : undefined;

  return (
    <input
      id={id}
      className="w-full rounded-md border-2 border-gray-400 bg-white p-2"
      data-testid={resolvedTestId}
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}
