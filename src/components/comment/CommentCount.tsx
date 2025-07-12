type Props = {
  postId: string
}

export default function CommentCount({ postId }: Props) {
  // 나중에 api 연결하고 콘솔 지우기
  const count = 2
  console.log(postId)
  return (
    <>
      <h2 className="text-[15px] font-medium mb-4">댓글 {count}개</h2>
    </>
  )
}
