'use client';
import { useState } from 'react';
import QuestPlayList from './QuestPlayList';
import QuestPlayView from './QuestPlayView';
import QuestPlayForm from './QuestPlayForm';

type Answer = {
  id: number;
  title: string;
  user: string;
  date: string;
  type: '정답' | '오답' | '참여';
  content: string;
  profileImage?: string;
};

// 임시 더미데이터
const dummyAnswers: Answer[] = [
  {
    id: 1,
    title: '여기잖아',
    user: '지지',
    date: '2025.07.07',
    type: '정답',
    content: '여기에서 발견했어요. 확실해요!',
  },
  {
    id: 2,
    title: '여기 아님',
    user: '코코',
    date: '2025.07.08',
    type: '오답',
    content: '여기 아닌 것 같아요. 위치가 다릅니다.',
  },
  {
    id: 3,
    title: '확실해',
    user: '루비',
    date: '2025.07.09',
    type: '참여',
    content: '저는 여기인 것 같아서 찍어봤어요.',
  },
];

export default function QuestDetailPlay() {
  // 퀘스트리스트 -> 상세
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  // 참여하기폼열기
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {selectedAnswer ? (
        <QuestPlayView
          answer={selectedAnswer}
          onBack={() => setSelectedAnswer(null)}
        />
      ) : isFormOpen ? (
        <QuestPlayForm onBack={() => setIsFormOpen(false)} />
      ) : (
        <QuestPlayList
          answers={dummyAnswers}
          onSelect={(answer) => setSelectedAnswer(answer)}
          onFormOpen={() => setIsFormOpen(true)}
        />
      )}
    </>
  );
}
