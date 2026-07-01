"use client";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

interface Props {
  text?: string;
}

export default function MathText({ text = "" }: Props) {
  const regex = /\$(.+?)\$/g;

  const elements: React.ReactNode[] = [];

  let lastIndex = 0;

  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    elements.push(
      <InlineMath
        key={match.index}
        math={match[1]}
      />
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <>{elements}</>;
}