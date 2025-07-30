'use client'

import { useParams } from 'next/navigation'
import Comment from '../comment/Comment'
import QuestDetailHeader from './QuestDetailHeader'
import QuestDetailPlay from './QuestDetailPlay'
import { useEffect, useState } from 'react'
import axiosInstance from '@/libs/axios'
import { QuestDetailData, SubmissionInfo } from '@/types/type'

type SubmissionRaw = {
  title: string
  description: string
  profileImage: string
  imageUrl: string
  nickname: string
  submittedAt: string
  recognized: boolean
}

type MemberQuest = {
  id: number
  title: string
  description: string
  imageUrl: string
  member: {
    nickname: string
  }
}

export default function QuestDetail() {
  const params = useParams()
  const questId = params?.id as string
  const [data, setData] = useState<QuestDetailData>()
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [questRes, commentsRes, memberQuestRes] = await Promise.all([
          axiosInstance.get(`/quests/${questId}/detail`),
          axiosInstance.get(`/comments/quests?questId=${questId}`),
          axiosInstance.get(`/quests/${questId}/memberQuest`),
        ])
        const rawSubmissions: SubmissionRaw[] = questRes.data.submission
        const memberQuests: MemberQuest[] = memberQuestRes.data.memberQuests

        const submissionWithId: SubmissionInfo[] = rawSubmissions.map(
          (submission) => {
            const matched = memberQuests.find((mq) => {
              const titleMatch = mq.title === submission.title
              const descMatch = mq.description === submission.description
              const imageMatch = mq.imageUrl === submission.imageUrl
              const nicknameMatch = mq.member.nickname === submission.nickname

              const allMatch =
                titleMatch && descMatch && imageMatch && nicknameMatch

              if (!allMatch) {
                console.warn('❌ 매칭 실패:', {
                  submission,
                  candidate: mq,
                  titleMatch,
                  descMatch,
                  imageMatch,
                  nicknameMatch,
                })
              }

              return allMatch
            })

            if (!matched) {
              console.warn('⚠️ 최종적으로 매칭된 memberQuest가 없습니다.', {
                submission,
              })
            }

            return {
              ...submission,
              id: matched?.id ?? null,
            }
          }
        )
        setData({
          quest: questRes.data.quest,
          submission: submissionWithId,
          comments: commentsRes.data.comments,
        })
      } catch (err) {
        console.error('데이터 요청 실패', err)
      }
    }
    fetchAll()
  }, [questId])

  if (!data) return null

  const {
    quest: questInfo,
    submission: submissionInfo,
    comments: commentsInfo,
  } = data
  return (
    <>
      {/* 퀘스트 정보 */}
      <QuestDetailHeader questInfo={questInfo} questId={Number(questId)} />
      <div className="mt-[30px] mx-auto w-[1100px] pb-[50px]">
        <div className="flex w-full">
          <div className="w-1/2">
            {/* 댓글 */}
            <Comment variant="quest" commentsInfo={commentsInfo} />
          </div>
          <div className="w-1/2">
            {/* 참여 + 랭킹*/}
            <QuestDetailPlay
              questInfo={questInfo}
              submissionInfo={submissionInfo}
            />
          </div>
        </div>
      </div>
    </>
  )
}
