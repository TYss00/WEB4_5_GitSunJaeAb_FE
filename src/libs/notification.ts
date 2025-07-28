import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axios';
import {
  Notification,
  NotificationResponse,
  NotificationType,
} from '@/types/notiType';

const mapNotificationToTabType = (
  type: NotificationType
): '게시글' | '공지' => {
  if (
    ['POST', 'QUEST', 'QUEST_DEADLINE', 'COMMENT', 'ZZIM', 'FORK'].includes(
      type
    )
  ) {
    return '게시글';
  }
  return '공지';
};

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await axiosInstance.get('/notifications?notificationType=ALL');
  const notifications: NotificationResponse[] = res.data.notifications;

  return notifications.map((noti) => ({
    id: noti.id,
    message: noti.content,
    type: mapNotificationToTabType(noti.notificationType),
    time: new Date(noti.createdAt).toLocaleString(),
    isRead: noti.read,
  }));
};

export const useNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

//  읽음 처리
export const markNotificationAsRead = async (id: number) => {
  const res = await axiosInstance.put(`/notifications/${id}/read`);
  return res.data.notification[0];
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Notification[]>(['notifications'], (old) => {
        if (!old) return old;
        return old.map((noti) =>
          noti.id === id ? { ...noti, isRead: true } : noti
        );
      });
    },
  });
};
