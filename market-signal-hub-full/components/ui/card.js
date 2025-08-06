export function Card({ children, ...props }) {
  return <div {...props} className="border border-gray-300 shadow-sm rounded-lg bg-white">{children}</div>;
}
export function CardContent({ children, ...props }) {
  return <div className="p-4" {...props}>{children}</div>;
}