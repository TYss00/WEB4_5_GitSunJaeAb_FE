import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axios';
import {
  AppNotification,
  NotificationResponse,
  NotificationType,
} from '@/types/notiType';
import { formatRelativeTime } from '@/utils/formatDate';

// 관리자 공지
const getAnnouncementType = (type: string | null): string => {
  switch (type) {
    case 'SYSTEM':
      return '[시스템] ';
    case 'EVENT':
      return '[이벤트] ';
    case 'UPDATE':
      return '[업데이트] ';
    case 'ETC':
      return '[안내사항] ';
    default:
      return '';
  }
};

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
    title:
      noti.notificationType === 'ANNOUNCEMENT'
        ? `${getAnnouncementType(noti.announcementType)}${noti.title}`
        : noti.title,
    message: noti.content,
    time: formatRelativeTime(noti.createdAt),
    isRead: noti.read,
    senderProfileImage: noti.sender?.profileImage ?? null,
    notificationType: noti.notificationType,
    type: mapNotificationTab(noti.notificationType),
    relatedRoadmap: noti.relatedRoadmap
      ? {
          id: noti.relatedRoadmap.id,
          mapType: noti.relatedRoadmap.mapType,
        }
      : undefined,
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
