export function Spinner({ size = 4, color = "border-brand-500" }) {
  const s = `w-${size} h-${size}`;
  return (
    <span
      className={`inline-block ${s} rounded-full border-2 border-brand-500/30 border-t-brand-500 animate-spin flex-shrink-0`}
    />
  );
}
