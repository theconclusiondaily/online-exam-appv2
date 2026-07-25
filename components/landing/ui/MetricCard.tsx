import GlassCard from "./GlassCard";

interface Props {
  value: string;
  label: string;
}

export default function MetricCard({
  value,
  label,
}: Props) {
  return (
    <GlassCard className="p-8 text-center">
      <h3 className="text-5xl font-black text-brand">
        {value}
      </h3>

      <p className="mt-3 text-brand-muted">
        {label}
      </p>
    </GlassCard>
  );
}