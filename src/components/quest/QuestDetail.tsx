'use client'

import { useParams } from 'next/navigation'
import Comment from '../comment/Comment'
import QuestDetailHeader from './QuestDetailHeader'
import QuestDetailPlay from './QuestDetailPlay'
import { useEffect, useState } from 'react'
import axiosInstance from '@/libs/axios'
import { QuestDetailData } from '@/types/type'

export default function QuestDetail() {
  const params = useParams()
  const questId = params?.id as string
  const [data, setData] = useState<QuestDetailData>()
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [questRes, commentsRes] = await Promise.all([
          axiosInstance.get(`/quests/${questId}/detail`),
          axiosInstance.get(`/comments/quests?questId=${questId}`),
        ])
        setData({
          quest: questRes.data.quest,
          submission: questRes.data.submission,
          comments: commentsRes.data.comments,
        })
        console.log(questRes.data.quest)
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
