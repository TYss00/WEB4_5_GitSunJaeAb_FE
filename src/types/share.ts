export type Marker = {
  markerTempId: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  color: string;
  customImageId: string;
  markerSeq: number;
  layerTempId: number;
};

export type MarkerWithAddress = Marker & {
  address?: string;
};
export type NewMarkerInput = Omit<
  MarkerWithAddress,
  'markerTempId' | 'markerSeq'
>;

// markerdto 타입 생성해서 생성, 수정, 삭제 시 서버로 보낼 때 쓰는 타입
// Marker + userId + action
export interface MarkerLogEntry extends Marker {
  address?: string;
  action: 'add' | 'update' | 'delete';
  memberId: number;
}

export type LayerLogEntry = {
  layerTempId: number;
  name: string;
  description: string;
  action: 'add' | 'update' | 'delete';
  memberId: number;
  roadmapId: number;
  layerSeq: number;
};

/** 마커 생성 시 사용할 입력 타입 (id 제외) */
export type MarkerInput = Omit<Marker, 'markerTempId'>;

/** 클라이언트 내부에서만 쓰는 마커 타입 (id는 필수) */
export interface LocalMarker extends Marker {
  id: number;
}

/** 레이어 타입 */
export interface Layer {
  layerTempId: number;
  name: string;
  layerSeq?: number;
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
  viewCount: number;
  participants: number;
  createdAt: string;
  likeCount: number;
}

export interface DashboardCardListProps {
  type: 'roadmap' | 'sharemap' | 'quest';
  data: DashboardShareMapCardProps[]; // 공유지도 전용 데이터
}

export interface ShareMapCardUIProps {
  id?: number;
  title: string;
  mapImageUrl: string;
  category: string;
  isEvent?: boolean;
  participants?: number;
  className?: string;
}

export interface RawRoadmap {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  roadmapType: 'SHARED' | 'PERSONAL';
  isPublic: boolean;
  isBookmarked?: boolean;
  bookmarkId?: number;
  category: {
    id: number;
    name: string;
  } | null;
  member: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    profileImage: string | null;
    role: string;
  };
  hashtags: { id: number; name: string }[];
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

export type ShareState = {
  layers: Layer[];
  addLayer: () => void;
  removeLayer: (id: number) => void;
  renameLayer: (id: number, newName: string) => void;
  layerSeqCounter: number;

  markers: Record<string, MarkerWithAddress>;
  selectedLayerId: number | null | 'all';
  setSelectedLayerId: (layerId: number | 'all') => void;

  roadmapId: number | null;
  setRoadmapId: (id: number) => void; //

  addMarker: (marker: NewMarkerInput) => void;
  addMarkerDirect: (marker: Marker) => void;
  updateMarker: (id: number, fields: Partial<MarkerWithAddress>) => void;
  removeMarker: (id: number) => void;
  filteredMarkers: () => MarkerWithAddress[];
};
