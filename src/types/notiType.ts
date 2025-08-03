export type NotificationType =
  | 'BOOKMARK'
  | 'COMMENT'
  | 'ZZIM'
  | 'FORK'
  | 'QUEST'
  | 'QUEST_DEADLINE'
  | 'ANNOUNCEMENT'
  | 'ETC';

export type AnnouncementType = 'SYSTEM' | 'EVENT' | 'UPDATE' | 'ETC' | null;

export type NotificationResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  read: boolean;
  notificationType: NotificationType;
  sender?: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    profileImage: string | null;
  } | null;
  relatedRoadmap?: {
    id: number;
    mapType: 'PERSONAL' | 'SHARED';
  };
  relatedLayer?: { id: number };
  relatedQuestId?: number;
  relatedCommentId?: number;
  announcementType: AnnouncementType;
};

export type AppNotification = {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  senderProfileImage?: string | null;
  notificationType: NotificationType;
  type: '게시글' | '공지';
  relatedRoadmap?: {
    id: number;
    mapType: 'PERSONAL' | 'SHARED';
  };
  relatedLayer?: { id: number };
  relatedQuestId?: number;
  relatedCommentId?: number;
};

export type NotiListItemProps = {
  noti: AppNotification;
  onClick: (noti: AppNotification) => void;
};
