import { Pair } from '../entities/pair';
import { Index } from '../types';
import { List } from './list';
import { Stream } from './stream';
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
export declare class MapImpl<K, V> implements Map<K, V> {
    _keys: K[];
    _values: V[];
    constructor();
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
    toPairs(): Pair<K, V>[];
}
export declare function empty<K, V>(): Map<K, V>;
export declare function createFromPairs<K, V>(pairs: Pair<K, V>[]): Map<K, V>;
export declare function create<K, V>(keys: K[], values: V[]): Map<K, V>;
