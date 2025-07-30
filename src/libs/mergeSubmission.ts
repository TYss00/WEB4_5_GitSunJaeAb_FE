import { SubmissionInfo } from '@/types/type';

type SubmissionRaw = {
  title: string;
  description: string;
  profileImage: string;
  imageUrl: string;
  nickname: string;
  submittedAt: string;
  isRecognized: boolean;
};

type MemberQuest = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  member: {
    nickname: string;
  };
};

export const mergeSubmissionWithId = (
  rawSubmissions: SubmissionRaw[],
  memberQuests: MemberQuest[]
): SubmissionInfo[] => {
  return rawSubmissions.map((submission) => {
    const matched = memberQuests.find((mq) => {
      return (
        mq.title === submission.title &&
        mq.description === submission.description &&
        mq.imageUrl === submission.imageUrl &&
        mq.member.nickname === submission.nickname
      );
    });

    return {
      ...submission,
      id: matched?.id ?? null,
      isRecognized: submission.isRecognized,
    };
  });
};
