interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-[32px]
        border
        border-white/40
        bg-white/70
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}