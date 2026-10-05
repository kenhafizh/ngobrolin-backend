import { LoginRequest, RegisterRequest } from '../types/auth.types';
export declare function validateLogin(body: unknown): {
    valid: true;
    data: LoginRequest;
} | {
    valid: false;
    error: string;
};
export declare function validateRegister(body: unknown): {
    valid: true;
    data: RegisterRequest;
} | {
    valid: false;
    error: string;
};
//# sourceMappingURL=auth.validation.d.ts.map