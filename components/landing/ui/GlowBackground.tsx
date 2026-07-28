import clsx from "clsx";

interface GlowBackgroundProps {
  variant?: "hero" | "light" | "dark";

  className?: string;
}

export default function GlowBackground({
  variant = "hero",
  className,
}: GlowBackgroundProps) {
  if (variant === "light") {
    return (
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div
          className="
            absolute
            -top-40
            left-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-brand/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[350px]
            w-[350px]
            rounded-full
            bg-blue-300/20
            blur-[100px]
          "
        />
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div
          className="
            absolute
            -top-56
            left-0
            h-[550px]
            w-[550px]
            rounded-full
            bg-brand/20
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/20
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            top-1/2
            left-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/5
            blur-[120px]
          "
        />
      </div>
    );
  }

  // Hero (default)
  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="
          absolute
          -top-40
          left-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-brand/15
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          top-52
          right-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-blue-300/25
          blur-[130px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/3
          h-[250px]
          w-[250px]
          rounded-full
          bg-brand/10
          blur-[100px]
        "
      />
    </div>
  );
}