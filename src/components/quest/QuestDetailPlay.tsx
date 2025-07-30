'use client';
import { useState } from 'react';
import QuestPlayList from './QuestPlayList';
import QuestPlayView from './QuestPlayView';
import QuestPlayForm from './QuestPlayForm';
import { SubmissionInfo } from '@/types/type';
import axiosInstance from '@/libs/axios';
import { useParams } from 'next/navigation';

export default function QuestDetailPlay({
  submissionInfo,
}: {
  submissionInfo: SubmissionInfo[];
}) {
  const [submissions, setSubmissions] =
    useState<SubmissionInfo[]>(submissionInfo);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionInfo | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const params = useParams();
  const questId = params?.id as string;

  const handleNewSubmission = async () => {
    try {
      const res = await axiosInstance.get(`/quests/${questId}/detail`);
      setSubmissions(res.data.submission ?? []);
      setIsFormOpen(false);
    } catch (err) {
      console.error('새 제출 후 데이터 갱신 실패', err);
    }
  };

  return (
    <>
      {selectedSubmission ? (
        <QuestPlayView
          submission={selectedSubmission}
          onBack={() => setSelectedSubmission(null)}
        />
      ) : isFormOpen ? (
        <QuestPlayForm onBack={handleNewSubmission} />
      ) : (
        <QuestPlayList
          submission={submissions}
          onSelect={(submission) => setSelectedSubmission(submission)}
          onFormOpen={() => setIsFormOpen(true)}
        />
      )}
    </>
  );
}
