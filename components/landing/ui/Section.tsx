interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Section({
  children,
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative
        w-full
        overflow-hidden
        py-24
        lg:py-32
        ${className}
      `}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}