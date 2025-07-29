import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axios';
import {
  AppNotification,
  NotificationResponse,
  NotificationType,
} from '@/types/notiType';
import { formatRelativeTime } from '@/utils/formatDate';

const mapNotificationTab = (type: NotificationType): '게시글' | '공지' => {
  return [
    'COMMENT',
    'QUEST',
    'QUEST_DEADLINE',
    'ZZIM',
    'FORK',
    'BOOKMARK',
  ].includes(type)
    ? '게시글'
    : '공지';
};

export const getNotifications = async (): Promise<AppNotification[]> => {
  const res = await axiosInstance.get('/notifications?notificationType=ALL');
  const notifications: NotificationResponse[] = res.data.notifications;

  return notifications.map((noti) => ({
    id: noti.id,
    title: noti.title,
    message: noti.content,
    time: formatRelativeTime(noti.createdAt),
    isRead: noti.read,
    senderProfileImage: noti.sender?.profileImage ?? null,
    notificationType: noti.notificationType,
    type: mapNotificationTab(noti.notificationType),
    relatedRoadmap: noti.relatedRoadmap,
    relatedLayer: noti.relatedLayer,
    relatedQuestId: noti.relatedQuestId,
    relatedCommentId: noti.relatedCommentId,
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
      queryClient.setQueryData<AppNotification[]>(['notifications'], (old) => {
        if (!old) return old;
        return old.map((noti) =>
          noti.id === id ? { ...noti, isRead: true } : noti
        );
      });
    },
  });
};
