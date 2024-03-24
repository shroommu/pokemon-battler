export default function Input({ testId, value, onChange, type }) {
  return (
    <input
      className="w-full rounded-md border-2 border-gray-400 p-2"
      data-testid={`${testId}-input`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
