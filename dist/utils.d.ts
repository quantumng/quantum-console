export declare function getQuery(key: string): string | null;
export declare function buildScript(url: string, callback: () => void): void;
declare type TFn = () => void;
export declare function nextTick(cb: TFn): void;
export declare function $(selector: string, el?: any): any;
export {};
