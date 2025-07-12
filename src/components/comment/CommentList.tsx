import CommentItem from './CommentItem'

type Props = {
  postId: string
}

export default function CommentList({ postId }: Props) {
  // 나중에 api 연결 + 콘솔지우기
  console.log(postId)
  return (
    <ul className="divide-y divide-[var(--gray-100)] max-h-[240px] overflow-y-scroll">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </ul>
  )
}
