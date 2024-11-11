export declare const _log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare const createPrefixLog: (spliter?: string, log?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => (message?: any, ...optionalParams: any[]) => void;
export declare const createPrefixLogAnsi: (spliter?: string, log?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}) => (message?: any, ...optionalParams: any[]) => void;
export declare const overWriteLog: () => void;
