export declare function existsFile(path: string): boolean;
export declare function existsDir(path: string): boolean;
export declare function readFile(path: string): string;
export declare function readFileAndMap<N>(path: string, mapper: (object: string) => N): N;
export declare function writeFile(path: string, data: string): void;
export declare function makeFile(path: string): void;
export declare function makeDir(path: string): void;
export declare function deleteFile(path: string): void;
