import CommentItem from './CommentItem';

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  // 나중에 api 연결 + 콘솔지우기
  console.log(postId);
  return (
    <ul>
      <CommentItem />
      <CommentItem />
    </ul>
  );
}
