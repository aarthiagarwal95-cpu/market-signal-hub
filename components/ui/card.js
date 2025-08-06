export function Card({ children, ...props }) {
  return (
    <div
      {...props}
      className="border border-gray-300 shadow-sm rounded-lg bg-white"
    >
      {children}
    </div>
  );
}
