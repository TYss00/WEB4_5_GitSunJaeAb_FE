'use client';
import { useState } from 'react';
import QuestPlayList from './QuestPlayList';
import QuestPlayView from './QuestPlayView';
import QuestPlayForm from './QuestPlayForm';
import { SubmissionInfo } from '@/types/type';

export default function QuestDetailPlay({
  submissionInfo,
}: {
  submissionInfo: SubmissionInfo[];
}) {
  const [submissions, setSubmissions] = useState(submissionInfo);

  // 퀘스트리스트 -> 상세
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionInfo | null>(null);

  // 참여하기폼열기
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 판정 후 submission 갱신
  const updateRecognizedStatus = (id: number, isRecognized: boolean) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, recognized: isRecognized } : s))
    );
  };

  return (
    <>
      {selectedSubmission ? (
        <QuestPlayView
          submission={selectedSubmission}
          onBack={() => setSelectedSubmission(null)}
          onJudge={updateRecognizedStatus}
        />
      ) : isFormOpen ? (
        <QuestPlayForm onBack={() => setIsFormOpen(false)} />
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
