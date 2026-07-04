import api from "./api.intance";
import config from '@/config/env.config';

class NotificationService {


    static async getNotifications(params?: { page?: number; limit?: number }): Promise<any> {
        const { data } = await api.get(`${config.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT || process.env.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT}`, { params });
        console.log('📩 [GET_NOTIFICATIONS] Notifications fetched:', data.data);
        return data;
    }

    static async markNotificationRead(notificationId: string): Promise<any> {
        const { data } = await api.patch(`${config.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT || process.env.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT}/${notificationId}/read`);
        return data;
    }

    static async markAllNotificationsRead(): Promise<any> {
        const { data } = await api.patch(`${config.NEXT_PUBLIC_NOTIFICATIONS_ALL_MARKED_READ_ENDPOINT || process.env.NEXT_PUBLIC_NOTIFICATIONS_ALL_MARKED_READ_ENDPOINT}`);
        return data;
    }

    static async deleteNotification(notificationId: string): Promise<any> {
        const { data } = await api.delete(`${config.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT || process.env.NEXT_PUBLIC_NOTIFICATIONS_ENDPOINT}/${notificationId}`);
        return data;
    }
}

export default NotificationService;