export default function GlowBackground() {
  return (
    <>
      <div
        className="
        absolute
        -top-40
        left-0
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-200/40
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        top-60
        right-0
        h-[450px]
        w-[450px]
        rounded-full
        bg-yellow-200/40
        blur-[120px]
        "
      />
    </>
  );
}