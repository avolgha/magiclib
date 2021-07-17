import {Index} from '../types';
import {makeStream, Stream} from './stream';
import {remove} from './util';

export interface List<T> {
  size(): number;
  push(element: T): void;
  pushAll(elements: T[]): void;
  get(index: Index): T | undefined;
  getIf(condition: (element: T) => boolean): T[];
  remove(element: T): void;
  removeIf(condition: (element: T) => boolean): void;
  forEach(func: (element: T) => void): void;
  stream(): Stream<T>;
}

export class ListImpl<T> implements List<T> {
  raw: T[];

  constructor(payload: T[]) {
    this.raw = payload;
  }

  size(): number {
    return this.raw.length;
  }

  push(element: T): void {
    this.raw.push(element);
  }

  pushAll(elements: T[]): void {
    elements.forEach(this.push);
  }

  get(index: Index): T | undefined {
    return this.raw[index];
  }

  getIf(condition: (element: T) => boolean): T[] {
    const next: T[] = [];

    for (const element of this.raw) {
      if (condition(element)) next.push(element);
    }

    return next;
  }

  remove(element: T): void {
    this.raw = remove(this.raw, element);
  }

  removeIf(condition: (element: T) => boolean): void {
    this.forEach(element => {
      if (condition(element)) {
        this.raw = remove(this.raw, element);
      }
    });
  }

  forEach(func: (element: T) => void): void {
    this.raw.forEach(func);
  }

  stream(): Stream<T> {
    return makeStream(this.raw);
  }
}

export function empty<T>(): List<T> {
  return new ListImpl<T>([]);
}

export function of<T>(...elements: T[]): List<T> {
  return fromArray(elements);
}

export function fromArray<T>(array: T[]): List<T> {
  return new ListImpl(array);
}
