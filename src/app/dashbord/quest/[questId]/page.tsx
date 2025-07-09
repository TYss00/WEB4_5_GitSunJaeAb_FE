import Comment from '@/components/comment/Comment';
import QuestDeatilRanking from '@/components/quest/QuestDeatilRanking';
import QuestDetailHeader from '@/components/quest/QuestDetailHeader';
import QuestDetailPlay from '@/components/quest/QuestDetailPlay';

type Props = {
  params: Promise<{ questId: string }>;
};

export default async function QuestDetailPage({ params }: Props) {
  const { questId } = await params;
  return (
    <>
      {/* 퀘스트 정보 */}
      <QuestDetailHeader />
      <div className="mt-[30px] mx-auto w-[1100px]">
        <div className="flex">
          {/* 댓글 */}
          <Comment postId={questId} variant="quest" />
          <div>
            {/* 참여 */}
            <QuestDetailPlay />
            {/* 랭킹 */}
            <QuestDeatilRanking />
          </div>
        </div>
      </div>
    </>
  );
}
