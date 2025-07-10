export type RoadMapCardProps = {
  category: string;
  mapImageUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  profileImgUrl: string;
  author: string;
  viewCount: number;
  shareCount: number;
  className?: string;
};

export type QuestCardProps = {
  isInProgress?: boolean;
  mapImageUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  profileImgUrl: string;
  author: string;
  deadLine: string;
};

export type ShareMapCardProps = {
  isEvent?: boolean;
  title: string;
  mapImageUrl: string;
  participants: number;
};

export type CardListProps = {
  type?: 'roadmap' | 'sharemap' | 'quest';
};

export type ButtonProps = {
  children: React.ReactNode;
  buttonStyle?: 'green' | 'white' | 'withIcon' | 'smGreen';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};
