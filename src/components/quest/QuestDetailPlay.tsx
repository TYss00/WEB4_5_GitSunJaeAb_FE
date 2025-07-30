'use client'
import { useState } from 'react'
import QuestPlayList from './QuestPlayList'
import QuestPlayView from './QuestPlayView'
import QuestPlayForm from './QuestPlayForm'
import { QuestInfo, SubmissionInfo } from '@/types/type'

export default function QuestDetailPlay({
  submissionInfo,
  questInfo,
}: {
  submissionInfo: SubmissionInfo[]
  questInfo: QuestInfo
}) {
  // 퀘스트리스트 -> 상세
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionInfo | null>(null)

  // 참여하기폼열기
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {selectedSubmission ? (
        <QuestPlayView
          questInfo={questInfo}
          submission={selectedSubmission}
          onBack={() => setSelectedSubmission(null)}
        />
      ) : isFormOpen ? (
        <QuestPlayForm onBack={() => setIsFormOpen(false)} />
      ) : (
        <QuestPlayList
          submission={submissionInfo}
          onSelect={(submission) => setSelectedSubmission(submission)}
          onFormOpen={() => setIsFormOpen(true)}
        />
      )}
    </>
  )
}
