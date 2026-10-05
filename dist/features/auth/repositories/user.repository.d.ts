import { UserData } from '../types/auth.types';
export declare class UserRepository {
    private get db();
    create(userData: Omit<UserData, 'uid'>): Promise<UserData>;
    findByUsername(username: string): Promise<UserData | null>;
    findByEmail(email: string): Promise<UserData | null>;
    findByUid(uid: string): Promise<UserData | null>;
    update(uid: string, data: Partial<UserData>): Promise<void>;
    delete(uid: string): Promise<void>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map