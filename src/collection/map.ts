import {Pair} from '../entities/pair';
import {Index} from '../types';
import {without} from '../util/logic';
import {fromArray, List} from './list';
import {makeStream, Stream} from './stream';

export interface Map<K, V> {
  size(): number;
  stream(): Stream<Pair<K, V>>;
  forEach(func: (pair: Pair<K, V>) => void): void;
  keys(): List<K>;
  values(): List<V>;
  remove(index: Index): void;
  put(key: K, value: V): void;
  get(key: K): V | undefined;
  containsKey(key: K): boolean;
  containsValue(value: V): boolean;
  list(): List<Pair<K, V>>;
}

export class MapImpl<K, V> implements Map<K, V> {
  _keys: K[];
  _values: V[];

  constructor() {
    this._keys = [];
    this._values = [];
  }

  size(): number {
    const keysLength = this._keys.length;
    const valuesLength = this._values.length;

    if (keysLength !== valuesLength) {
      throw new Error(
        `keys length and values length aren't the same: ${
          keysLength > valuesLength
            ? keysLength - valuesLength + ' more keys'
            : valuesLength - keysLength + ' more values'
        }`
      );
    }

    return keysLength;
  }

  stream(): Stream<Pair<K, V>> {
    return makeStream(this.toPairs());
  }

  forEach(func: (pair: Pair<K, V>) => void): void {
    this.toPairs().forEach(func);
  }

  keys(): List<K> {
    return fromArray(this._keys);
  }

  values(): List<V> {
    return fromArray(this._values);
  }

  remove(index: Index): void {
    this.size();

    if (this._keys[index]) {
      this._keys = without(this._keys, index);
      this._values = without(this._values, index);
    }
  }

  put(key: K, value: V): void {
    const keysLength = this._keys.length;
    const valuesLength = this._values.length;

    if (keysLength !== valuesLength) {
      throw new Error(
        `keys length and values length aren't the same: ${
          keysLength > valuesLength
            ? keysLength - valuesLength + ' more keys'
            : valuesLength - keysLength + ' more values'
        }`
      );
    }

    this._keys.push(key);
    this._values.push(value);
  }

  get(key: K): V | undefined {
    if (!this.containsKey(key)) return undefined;
    const index = this._keys.indexOf(key);
    return this._values[index];
  }

  containsKey(key: K): boolean {
    return makeStream(this._keys).anyMatch(element => element === key);
  }

  containsValue(value: V): boolean {
    return makeStream(this._values).anyMatch(element => element === value);
  }

  list(): List<Pair<K, V>> {
    return fromArray(this.toPairs());
  }

  toPairs(): Pair<K, V>[] {
    this.size();
    const next: Pair<K, V>[] = [];

    for (let index = 0; index < this.keys().size(); index++) {
      const key = this._keys[index];
      const value = this._values[index];

      next.push({
        left() {
          return key;
        },

        right() {
          return value;
        },
      });
    }

    return next;
  }
}

export function empty<K, V>(): Map<K, V> {
  return new MapImpl<K, V>();
}

export function createFromPairs<K, V>(pairs: Pair<K, V>[]) {
  const map = empty<K, V>();
  pairs.forEach(pair => map.put(pair.left(), pair.right()));
  return map;
}

export function create<K, V>(keys: K[], values: V[]): Map<K, V> {
  const map = empty<K, V>();
  let currentIndex = 0;
  for (const key of keys) {
    map.put(key, values[currentIndex]);
    currentIndex++;
  }
  return map;
}
