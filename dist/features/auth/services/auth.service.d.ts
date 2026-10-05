import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth.types';
export declare class AuthService {
    register(data: RegisterRequest): Promise<RegisterResponse>;
    login(data: LoginRequest): Promise<LoginResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map