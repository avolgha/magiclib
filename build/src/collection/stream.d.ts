export interface Stream<T> {
    filter(condition: (object: T) => boolean): Stream<T>;
    map<N>(mapper: (object: T) => N): Stream<N>;
    forEach(func: (object: T) => void): void;
    anyMatch(condition: (object: T) => boolean): boolean;
    noneMatch(condition: (object: T) => boolean): boolean;
}
export declare class StreamImpl<T> implements Stream<T> {
    readonly raw: T[];
    constructor(payload: T[]);
    filter(condition: (object: T) => boolean): Stream<T>;
    map<N>(mapper: (object: T) => N): Stream<N>;
    forEach(func: (object: T) => void): void;
    anyMatch(condition: (object: T) => boolean): boolean;
    noneMatch(condition: (object: T) => boolean): boolean;
}
export declare function makeStream<T>(array: T[]): Stream<T>;
