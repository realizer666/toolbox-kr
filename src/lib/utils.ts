export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
