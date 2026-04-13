interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export default function Badge({ children, color = '#7c3aed' }: BadgeProps) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
      style={{
        backgroundColor: `${color}26`,
        border: `1px solid ${color}4d`,
        color,
      }}
    >
      {children}
    </span>
  );
}
