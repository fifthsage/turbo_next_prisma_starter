export function isLast(count: number, skip: number, take: number) {
  return skip + take >= count;
}
