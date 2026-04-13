interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
}

export default function Section({ id, children, className = '', alt }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen py-24 ${alt ? 'bg-bg-alt' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
