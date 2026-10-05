import { Socket } from 'socket.io';
export interface SocketUser {
    username: string;
}
export interface AuthSocket extends Socket {
    user?: SocketUser;
}
//# sourceMappingURL=index.d.ts.map