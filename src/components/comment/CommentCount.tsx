export default function CommentCount({ count }: { count: number }) {
  return (
    <>
      <h2 className="text-[15px] font-medium mb-4">댓글 {count}개</h2>
    </>
  )
}
