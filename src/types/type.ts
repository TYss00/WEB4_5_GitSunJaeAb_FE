import React, { ReactNode } from 'react'

export type HeaderProps = {
  isAdmin?: boolean
}

export type CategoryAddCardProps = {
  type?: 'category' | 'marker'
  onClick?: () => void
}

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

export type CardListProps = {
  type?: 'roadmap' | 'sharemap' | 'quest'
}

export type ButtonProps = {
  children: React.ReactNode
  style?: string | undefined
  buttonStyle?: 'green' | 'white' | 'withIcon' | 'smGreen'
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export type MarkerEditProps = {
  id: number
  isTextArea?: boolean
  onDelete: () => void
  address?: string
  name?: string
  description?: string
  onAddByAddress?: (address: string) => void
  onChangeName?: (id: number, name: string) => void
  onChangeDescription?: (id: number, description: string) => void
}

export type MarkerDetailProps = {
  title: string
  description: string
  location: { lat: number; lng: number }
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
  createdAt?: string | null
}

export type Member = {
  id: number
  name: string
  nickname: string
  email: string
  profileImage: string | null
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
export type RoadmapInfo = {
  title: string
  category: {
    id: number
    name: string
  }
  description: string
  thumbnail: string
  member: Member
  hashtags: {
    id: number
    name: string
  }[]

  likeCount: number
  viewCount: number
  layers: {
    layer: {
      id: number
      name: string
      description: string
      layerSeq: number
    }
    markers: {
      id: number
      name: string
      description: string
      address: string
      lat: number
      lng: number
      color: string
      customImage: {
        id: number
        name: string
        markerImage: string
      }
      markerSeq: number
      layerId: number
    }[]
  }[]

  isPublic: true
  isAnimated: true
}

export type BookmarksInfo = {
  id: number
  roadmap: number
  member: number
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

export type RoadmapWriteProps = {
  categories: CategoryInfo[]
}

export type RoadmapDetailProps = {
  roadmap: RoadmapInfo
  comments: CommentInfo[]
}

export type MarkerData = {
  name?: string
  description?: string
  color?: string
  customImageId?: string | null
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

export type SearchRecord = {
  term: string
  date: string
}

export type CategorySetting = {
  id: number
  name: string
}
export type Marker = {
  id: number
  name: string
  description: string
  lat: number
  lng: number
  color: string
  imageUrl: string
  markerSeq: number
  layer: number
  member?: {
    id: number
    name: string
    nickname: string
    email: string
    profileImage: string
  }
}

export type LandingCategories = {
  id: number
  name: string
  description: string
  categoryImage: string | null
  createdAt: string
}

export type LandingCategoryResponse = {
  code: string
  message: string
  timestamp: string
  categories: LandingCategories[]
}

export type SearchInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}
