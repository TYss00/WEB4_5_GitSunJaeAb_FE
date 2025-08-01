import {
  mergeSubmissionWithIdMemberQuest,
  mergeSubmissionWithIdSubmissionRaw,
  SubmissionInfo,
} from '@/types/type';

export const mergeSubmissionWithId = (
  rawSubmissions: mergeSubmissionWithIdSubmissionRaw[],
  memberQuests: mergeSubmissionWithIdMemberQuest[]
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
