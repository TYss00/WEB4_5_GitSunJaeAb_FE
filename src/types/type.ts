import React, { ReactNode } from 'react'

export type RoadMapCardProps = {
  category: string
  mapImageUrl: string
  title: string
  description: string
  hashtags: string[]
  profileImgUrl: string
  author: string
  viewCount: number
  shareCount: number
  className?: string
}

export type QuestCardProps = {
  isInProgress?: boolean
  mapImageUrl: string
  title: string
  description: string
  hashtags: string[]
  profileImgUrl: string
  author: string
  deadLine: string
}

export type ShareMapCardProps = {
  isEvent?: boolean
  title: string
  mapImageUrl: string
  participants: number
  className?: string
}

export type MypageCardProps = {
  title: string
  date: string
  author?: string
  type: '공개' | '비공개' | '퀘스트' | '공유'
  mapImageUrl: string
  isLiked?: boolean
}

export type CardListProps = {
  type?: 'roadmap' | 'sharemap' | 'quest'
}

export type MypagePostProps = {
  activeTab: '작성글' | '참여글' | '좋아요글'
}

export type ButtonProps = {
  children: React.ReactNode
  buttonStyle?: 'green' | 'white' | 'withIcon' | 'smGreen'
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export type MarkerEditProps = {
  isTextArea?: boolean
  onDelete: () => void
  address?: string
  onAddByAddress?: (address: string) => void
  addMarkerByAddress?: (layer: string, address: string) => void
}

export type MarkerDetailProps = {
  title: string
  description: string
  isTextArea?: boolean
}

export type LayerEditProps = {
  title: string
  defaultOpen?: boolean
  markers?: MarkerData[]
  onDelete: () => void
  deleteMarker: (layer: string, markerId: number) => void
  addMarkerByAddress: (layer: string, address: string) => void
}
export type LayerDetailProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export type ToggleProps = {
  label: '공개' | '경로' | '애니메이션'
  onChange?: (isActive: boolean) => void
}

export type SearchItemProps = {
  term: string
  date: string
  onRemove: () => void
}

export type HashtagProps = {
  id: number
  name: string
  createdAt: string | null
}

export type Member = {
  id: number
  name: string
  nickname: string
  email: string
  profileImage: string | null
}

export type RoadmapInfo = {
  title: string
  category: { id: number; name: string }
  description: string
  thumbnail: null
  member: Member
  hashtags: HashtagProps[]
  likeCount: number
  viewCount: number
  isPublic: boolean
  isAnimated: boolean
}

export type LayerInfo = {
  id: number
  name: string
  description: string | null
  layerSeq: number
  layerTime: string
  createdAt: string
  member: Member
  roadmap: number
}

export type CommentInfo = {
  id: number
  content: string
  roadmapId: number
  member: Member
  questId: number | null
  createdAt: string
}

export type CategoryInfo = {
  id: number
  name: string
  categoryImage: null | string
  description: string
  createdAt: string
}

export type MarkerInfo = {
  id: number
  name: string
  description: string
  lat: number
  lng: number
  color: string
  imageUrl: string
  markerSeq: number
  layer: number
  member: Member
}
export type RoadmapDetailProps = {
  roadMapInfo: RoadmapInfo
  layerInfo: LayerInfo[]
  markersByLayer: MarkerInfo[]
  commentsInfo: CommentInfo[]
}

export type RoadmapWriteProps = {
  categories: CategoryInfo[]
}

export type MarkerData = {
  id: number
  lat: number
  lng: number
  address: string
}
export type LayerMarkers = {
  [layerName: string]: MarkerData[]
}

export type MapProps = {
  center?: google.maps.LatLngLiteral
  selectedLayer: string
  layerMarkers: LayerMarkers
  onMapClick: (lat: number, lng: number) => void
  onMarkerDelete: (layer: string, id: number) => void
}
