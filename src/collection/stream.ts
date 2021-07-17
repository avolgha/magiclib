export interface Stream<T> {
  filter(condition: (object: T) => boolean): Stream<T>;
  map<N>(mapper: (object: T) => N): Stream<N>;
  forEach(func: (object: T) => void): void;
  anyMatch(condition: (object: T) => boolean): boolean;
  noneMatch(condition: (object: T) => boolean): boolean;
}

export class StreamImpl<T> implements Stream<T> {
  readonly raw: T[];

  constructor(payload: T[]) {
    this.raw = payload;
  }

  filter(condition: (object: T) => boolean): Stream<T> {
    const next: T[] = [];

    for (const element of this.raw) {
      if (condition(element)) next.push(element);
    }

    return new StreamImpl(next);
  }

  map<N>(mapper: (object: T) => N): Stream<N> {
    const next: N[] = [];

    for (const element of this.raw) {
      next.push(mapper(element));
    }

    return new StreamImpl(next);
  }

  forEach(func: (object: T) => void): void {
    this.raw.forEach(element => func(element));
  }

  anyMatch(condition: (object: T) => boolean): boolean {
    for (const element of this.raw) {
      if (condition(element)) return true;
    }
    return false;
  }

  noneMatch(condition: (object: T) => boolean): boolean {
    return !this.anyMatch(condition);
  }
}

export function makeStream<T>(array: T[]): Stream<T> {
  return new StreamImpl(array);
}
