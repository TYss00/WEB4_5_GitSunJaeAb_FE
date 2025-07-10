import { ReactNode } from 'react'

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
}

export type MarkerEditProps = {
  isTextArea?: boolean
  onDelete: () => void
}

export type MarkerDetailProps = {
  isTextArea?: boolean
}

export type LayerEditProps = {
  title: string
  isTextArea?: boolean
  defaultOpen?: boolean
}
export type LayerDetailProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}
