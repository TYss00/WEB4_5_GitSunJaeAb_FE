export type RoadmapResponse = {
  category: { id: number };
  title: string;
  description: string;
  isPublic: boolean;
  thumbnail: string;
  hashtags: { name: string }[];
  layers: {
    layer: {
      id: number;
      name: string;
      description: string;
      layerSeq: number;
    };
    markers: {
      id: number | null;
      name: string;
      description: string;
      address: string;
      lat: number;
      lng: number;
      color: string;
      markerSeq: number;
    }[];
  }[];
};

export type ServerMarker = {
  markerId: number | null;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  color: string;
  markerSeq: number;
};

export type ServerLayer = {
  layerId: number | null;
  name: string;
  description: string;
  layerSeq: number;
  markers: ServerMarker[];
};

export type ClientMarker = {
  id: number | null;
  name: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  color: string;
  customImageId: string | null;
  layerId?: number;
};
