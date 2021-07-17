export function times(times: number, action: (index?: number) => void) {
  for (let index = 0; index < times; index++) {
    action(index);
  }
}
