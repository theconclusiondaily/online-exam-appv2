interface Props {
  children: React.ReactNode;
}

export default function FloatingBadge({
  children,
}: Props) {
  return (
    <div
      className="
      rounded-full
      bg-white
      shadow-xl
      border
      border-gray-100
      px-4
      py-2
      font-semibold
      text-sm
      "
    >
      {children}
    </div>
  );
}