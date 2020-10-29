type LaravelNotification = {
    id: string;
    notifiable_id: number;
    notifiable_type: string;
    type: string;
    read_at: string /* Date */;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    data: NotificationData;
}
