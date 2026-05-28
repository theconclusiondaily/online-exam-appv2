import Image from "next/image";

export default function TCDLogo({
  size = 60,
}: {
  size?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt="The Conclusion Daily"
      width={size}
      height={size}
      priority
    />
  );
}