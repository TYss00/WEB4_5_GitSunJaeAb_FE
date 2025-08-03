'use client';

import { useParams } from 'next/navigation';
import Comment from '../comment/Comment';
import QuestDetailHeader from './QuestDetailHeader';
import QuestDetailPlay from './QuestDetailPlay';
import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';
import { QuestDetailData, SubmissionInfo } from '@/types/type';
import { MemberQuest, SubmissionRaw } from '@/types/quest';

export default function QuestDetail() {
  const params = useParams();
  const questId = params?.id as string;
  const [data, setData] = useState<QuestDetailData>();
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [questRes, commentsRes, memberQuestRes] = await Promise.all([
          axiosInstance.get(`/quests/${questId}/detail`),
          axiosInstance.get(`/comments/quests?questId=${questId}`),
          axiosInstance.get(`/quests/${questId}/memberQuest`),
        ]);
        const rawSubmissions: SubmissionRaw[] = questRes.data.submission;
        const memberQuests: MemberQuest[] = memberQuestRes.data.memberQuests;

        const submissionWithId: SubmissionInfo[] = rawSubmissions.map(
          (submission) => {
            const matched = memberQuests.find((mq) => {
              const titleMatch = mq.title === submission.title;
              const descMatch = mq.description === submission.description;
              const imageMatch = mq.imageUrl === submission.imageUrl;
              const nicknameMatch = mq.member.nickname === submission.nickname;

              return titleMatch && descMatch && imageMatch && nicknameMatch;
            });

            return {
              ...submission,
              id: matched?.id ?? null,
              isRecognized: submission.isRecognized,
              memberId: matched?.member?.id ?? null,
              createdAt: matched?.createdAt ?? submission.submittedAt,
            };
          }
        );
        setData({
          quest: questRes.data.quest,
          submission: submissionWithId,
          comments: commentsRes.data.comments,
        });
      } catch (err) {
        console.error('데이터 요청 실패', err);
      }
    };
    fetchAll();
  }, [questId]);

  if (!data) return null;

  const {
    quest: questInfo,
    submission: submissionInfo,
    comments: commentsInfo,
  } = data;
  return (
    <>
      <QuestDetailHeader questInfo={questInfo} questId={Number(questId)} />
      <div className="mt-[30px] mx-auto w-[1100px] pb-[50px]">
        <div className="flex w-full gap-4">
          <div className="w-1/2 h-[577px] pr-2">
            <Comment variant="quest" commentsInfo={commentsInfo} />
          </div>
          <div className="w-1/2 h-[577px] pl-2">
            <QuestDetailPlay
              questAuthorId={questInfo.member.id}
              submissionInfo={submissionInfo}
              questIsActive={questInfo.isActive}
            />
          </div>
        </div>
      </div>
    </>
  );
}
