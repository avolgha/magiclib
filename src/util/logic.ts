export function without<T>(array: T[], index: Number): T[] {
  const next: T[] = [];
  let currentIndex = 0;

  for (const element of array) {
    if (currentIndex !== index) {
      next.push(element);
    }
    currentIndex++;
  }

  return next;
}
