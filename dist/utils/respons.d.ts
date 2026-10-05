export interface SuccessResponse<T = unknown> {
    success: true;
    message: string;
    data: T;
}
export interface ErrorResponse {
    success: false;
    message: string;
    errors?: unknown;
}
export declare function success<T>(message: string, data: T): SuccessResponse<T>;
export declare function error(message: string, errors?: unknown): ErrorResponse;
//# sourceMappingURL=respons.d.ts.map