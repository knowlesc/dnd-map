export function AppError({ error }: { error: string }) {
  return <main className="px-24 py-12 font-bold">{error}</main>;
}
