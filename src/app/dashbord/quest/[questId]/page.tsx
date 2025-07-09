import QuestDeatilRanking from '@/components/quest/QuestDeatilRanking';
import QuestDetailComment from '@/components/quest/QuestDetailComment';
import QuestDetailHeader from '@/components/quest/QuestDetailHeader';
import QuestDetailPlay from '@/components/quest/QuestDetailPlay';

export default function QuestDetailPage() {
  return (
    <>
      {/* 퀘스트 정보 */}
      <QuestDetailHeader />
      <div className="mt-[30px] flex">
        {/* 댓글 */}
        <QuestDetailComment />
        <div>
          {/* 참여 */}
          <QuestDetailPlay />
          {/* 랭킹 */}
          <QuestDeatilRanking />
        </div>
      </div>
    </>
  );
}
