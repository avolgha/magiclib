export interface Logger {
    get prefix(): string;
    get options(): {
        timestamp: boolean;
        prefix: boolean;
    };
    _print(message: string, color: LogColor): void;
    _format(text: string, objects: any[], options?: {
        delemiter: string;
    }): string;
    info(message: string, objects?: any[]): void;
    debug(message: string, objects?: any[]): void;
    warn(message: string, objects?: any[]): void;
    error(message: string, objects?: any[]): void;
    exception(message: string, exception: Error, objects?: any[]): void;
}
export declare type LogColor = 'grey' | 'green' | 'yellow' | 'red' | 'blue';
export declare class LoggerImpl implements Logger {
    name: string;
    constructor(namePayload: string);
    get prefix(): string;
    get options(): {
        timestamp: boolean;
        prefix: boolean;
    };
    _print(message: string, color: LogColor): void;
    _format(text: string, objects: any[], options?: {
        delemiter: string;
    }): string;
    info(message: string, objects?: any[]): void;
    debug(message: string, objects?: any[]): void;
    warn(message: string, objects?: any[]): void;
    error(message: string, objects?: any[]): void;
    exception(message: string, exception: Error, objects?: any[]): void;
}
export declare function construct(options?: {
    name: string;
}): Logger;
