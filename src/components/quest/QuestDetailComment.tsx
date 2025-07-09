import QuestDetailCommentItem from './QuestDetailCommentItem';

export default function QuestDetailComment() {
  return (
    <div className="px-4">
      {/* 댓글 갯수 */}
      <h2>댓글 2</h2>

      {/* 댓글 리스트 */}
      <div>
        <QuestDetailCommentItem />
        <QuestDetailCommentItem />
      </div>

      {/* 댓글 입력창 */}
      <div></div>
    </div>
  );
}
