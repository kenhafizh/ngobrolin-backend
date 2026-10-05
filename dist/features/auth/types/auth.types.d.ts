export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    username: string;
}
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    displayName?: string;
}
export interface RegisterResponse {
    uid: string;
    username: string;
    email: string;
    displayName: string;
    createdAt: string;
}
export interface UserData {
    uid: string;
    username: string;
    email: string;
    password: string;
    displayName: string;
    photoURL?: string;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=auth.types.d.ts.map