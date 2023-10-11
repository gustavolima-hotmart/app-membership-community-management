export function renderIcon(icon: string): string | null {
  const [i] = icon?.split('-') ?? []

  if (!i) return null

  return String.fromCodePoint(Number(i))
}
