import { CommentInfo } from './type'

export type CommentProps = {
  author: number
  commentsInfo: CommentInfo[]
  variant?: 'roadmap' | 'sharemap' | 'quest'
}

export type CommentListProps = {
  author: number
  comments: CommentInfo[]
  onDelete?: (id: number) => void
  onUpdate?: (updated: CommentInfo) => void
}
