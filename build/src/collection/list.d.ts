import { Index } from '../types';
import { Stream } from './stream';
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
export declare class ListImpl<T> implements List<T> {
    raw: T[];
    constructor(payload: T[]);
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
export declare function empty<T>(): List<T>;
export declare function of<T>(...elements: T[]): List<T>;
export declare function fromArray<T>(array: T[]): List<T>;
