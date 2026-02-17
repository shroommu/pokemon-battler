export default function Menu({ children, testId = "menu" }) {
  return (
    <div className="p-4 border-2" data-testid={testId}>
      {children}
    </div>
  );
}
