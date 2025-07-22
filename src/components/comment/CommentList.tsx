import { CommentInfo } from '@/types/type'
import CommentItem from './CommentItem'

type Props = {
  commentsInfo: CommentInfo[]
}

export default function CommentList({ commentsInfo }: Props) {
  return (
    <ul className="divide-y divide-[var(--gray-100)] max-h-[240px] overflow-y-auto">
      {commentsInfo.map((comment: CommentInfo) => {
        return <CommentItem key={comment.id} commentInfo={comment} />
      })}
    </ul>
  )
}
