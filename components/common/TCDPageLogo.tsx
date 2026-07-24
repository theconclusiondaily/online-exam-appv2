import Image from "next/image";
import Link from "next/link";

interface TCDPageLogoProps {
  centered?: boolean;
  size?: number;
  clickable?: boolean;
}

export default function TCDPageLogo({
  centered = false,
  size = 72,
  clickable = true,
}: TCDPageLogoProps) {
  const logo = (
    <Image
      src="/logo.png"
      alt="The Conclusion Daily"
      width={size}
      height={size}
      priority
      className="object-contain"
    />
  );

  return (
    <div
      className={
        centered
          ? "flex justify-center"
          : "flex justify-start"
      }
    >
      {clickable ? (
        <Link
          href="/"
          aria-label="The Conclusion Daily Home"
        >
          {logo}
        </Link>
      ) : (
        logo
      )}
    </div>
  );
}