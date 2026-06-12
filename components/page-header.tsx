export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6">
      <h1 className="text-xl font-extrabold tracking-tight text-stone-800">{title}</h1>
      {subtitle && <p className="mt-1 text-sm font-semibold text-sea-800/70">{subtitle}</p>}
    </header>
  );
}
