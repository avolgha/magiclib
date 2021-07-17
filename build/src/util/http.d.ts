declare type RequestType = 'GET' | 'POST';
export declare function makeRequest(type: RequestType, url: string, body?: string | undefined, headers?: {
    [key: string]: [value: string];
} | undefined): string;
export {};
