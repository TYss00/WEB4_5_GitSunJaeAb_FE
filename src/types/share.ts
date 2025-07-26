export type Marker = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  color: string;
  imageUrl: string;
  markerSeq: number;
  layer: number;
  member?: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    profileImage: string;
  };
};

/** 마커 생성 시 사용할 입력 타입 (id 제외) */
export type MarkerInput = Omit<Marker, 'id'>;

/** 클라이언트 내부에서만 쓰는 마커 타입 (id는 필수) */
export interface LocalMarker extends Marker {
  id: number;
}

/** 레이어 타입 */
export interface Layer {
  id: number;
  name: string;
}

/** ShareLayerEdit에 들어가는 props */
export interface ShareLayerEditProps {
  layer: Layer;
  isTextArea?: boolean;
  defaultOpen?: boolean;
}

export interface DashboardShareMapCardProps {
  id: number;
  title: string;
  thumbnail: string;
  categoryName: string;
}

export interface DashboardCardListProps {
  type: 'roadmap' | 'sharemap' | 'quest';
  data: DashboardShareMapCardProps[]; // 공유지도 전용 데이터
}

export interface ShareMapCardUIProps {
  id: number;
  title: string;
  mapImageUrl: string;
  category: string;
  isEvent?: boolean;
  participants?: number;
  className?: string;
}

export interface RoadmapDetailResponse {
  id?: number;
  title: string;
  description: string;
  address: string;
  regionLatitude: number;
  regionLongitude: number;
  participationEnd: string;
  likeCount: number;
  viewCount: number;
  thumbnail: string;
  category: {
    id: number;
    name: string;
  };
  member: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    profileImage: string;
  };
  hashtags: { id: number; name: string }[];
  layers: {
    layer: {
      id: number;
      name: string;
      description: string;
      layerSeq: number;
      layerTime: string;
      createdAt: string;
    };
    markers: {
      id: number;
      name: string;
      description: string;
      address: string;
      lat: number;
      lng: number;
      color: string;
      customImage: {
        id: number;
        name: string;
        markerImage: string;
      };
      markerSeq: number;
      layerId: number;
    }[];
  }[];
  isPublic: boolean;
  isAnimated: boolean;
}
