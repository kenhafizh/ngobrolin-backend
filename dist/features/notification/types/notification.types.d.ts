export interface PushNotificationPayload {
    title: string;
    body: string;
    data?: Record<string, string>;
}
export interface OnlineUserInfo {
    socketId: string;
    username: string;
    fcmToken?: string;
}
//# sourceMappingURL=notification.types.d.ts.map