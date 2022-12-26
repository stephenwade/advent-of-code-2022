/** https://exploringjs.com/impatient-js/ch_sets.html#intersection-a-b */
export function intersection<T>(first: Iterable<T>, second: Iterable<T>): T[] {
  const a = new Set(first);
  const b = new Set(second);

  return [...a].filter((x) => b.has(x));
}
