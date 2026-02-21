export default function Input({ id, testId, value, onChange, type = "text" }) {
  return (
    <input
      id={id}
      className="w-full rounded-md border-2 border-gray-400 bg-white p-2"
      data-testid={`${testId}-input`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
