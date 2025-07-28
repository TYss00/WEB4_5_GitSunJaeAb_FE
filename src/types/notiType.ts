export type NotificationType =
  | 'POST'
  | 'COMMENT'
  | 'ZZIM'
  | 'FORK'
  | 'QUEST'
  | 'QUEST_DEADLINE'
  | 'ANNOUNCEMENT'
  | 'ETC';

export type Notification = {
  id: number;
  message: string;
  type: '게시글' | '공지';
  time: string;
  isRead: boolean;
};

export type NotificationSender = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  profileImage: string | null;
};

export type NotificationResponse = {
  id: number;
  content: string;
  createdAt: string;
  read: boolean;
  notificationType: NotificationType;
  sender?: NotificationSender | null;
};
