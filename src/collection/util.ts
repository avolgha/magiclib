export function remove<T>(array: T[], _element: T): T[] {
  const next: T[] = [];
  for (const element of array) {
    if (element !== _element) {
      next.push(element);
    }
  }
  return next;
}
