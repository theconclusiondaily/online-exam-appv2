import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  size?: number;
}

export default function TCDIcon({
  src,
  alt,
  size = 40,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}