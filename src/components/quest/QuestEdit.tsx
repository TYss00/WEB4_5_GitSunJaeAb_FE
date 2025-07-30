'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import axiosInstance from '@/libs/axios'
import { ChevronLeft, ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function QuestEdit() {
  const { id } = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [deadline, setDeadline] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hint, setHint] = useState('')
  const isActive = true

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const res = await axiosInstance.get(`/quests/${id}`)
        const data = res.data.quest

        console.log('불러온 데이터', data)

        setTitle(data.title)
        setDescription(data.description)
        setHint(data.hint ?? '')
        setDeadline(data.deadline)
        setPreviewImage(data.questImage ?? null)
      } catch (err) {
        console.error('데이터 불러오기 실패', err)
      }
    }
    if (id) fetchQuest()
  }, [id])

  const handleContentClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      let imageFile = fileInputRef.current?.files?.[0]
      if (!imageFile && previewImage) {
        const response = await fetch(previewImage)
        const blob = await response.blob()
        const filename = previewImage.split('/').pop() || 'quest.jpg'
        imageFile = new File([blob], filename, { type: blob.type })
      }

      if (!imageFile) {
        toast('이미지를 선택해주세요')
        return
      }

      const requestData = {
        title,
        description,
        hint,
        deadline: deadline + 'T23:59:59+09:00',
        isActive,
      }

      const RequestBlob = new Blob([JSON.stringify(requestData)], {
        type: 'application/json',
      })

      formData.append('questRequest', RequestBlob)
      formData.append('imageFile', imageFile)

      await axiosInstance.put(`/quests/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('퀘스트가 성공적으로 등록되었습니다.')
      handleCancel()
    } catch (err) {
      console.error('퀘스트 등록 실패', err)
      toast.error('퀘스트 등록 실패')
    }
  }

  return (
    <div className="max-w-xl w-full h-[760px] mx-auto mt-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-y-scroll">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-[var(--primary-300)] cursor-pointer mb-4"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>

      {/* 제목 */}
      <h2 className="text-center text-2xl font-semibold mb-8">퀘스트 수정</h2>

      {/* 이미지 */}
      <div
        className="relative w-full h-60 bg-[#e4e4e4] border border-dashed border-[#e4e4e4] rounded-md p-3 mb-6 cursor-pointer flex items-center justify-center"
        onClick={handleContentClick}
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="미리보기"
            fill
            priority
            unoptimized
            className="object-fill"
          />
        ) : (
          <ImagePlus className="text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 마감 기한 */}
      <div className="mb-6">
        <Input
          type="date"
          label="마감 기한 설정"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="rounded-sm"
        />
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <Input
          type="text"
          label="제목"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-sm"
        />
      </div>

      {/* 내용 */}
      <div className="mb-6 flex flex-col gap-1 w-full">
        <label className="block text-base text-[var(--black)]">내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[150px] rounded-sm border border-[var(--gray-50)] px-3 py-2  outline-none focus:border-[var(--primary-300)] focus:ring-1 focus:ring-[var(--primary-300)] placeholder:text-sm placeholder:text-[var(--gray-200)]"
        />
      </div>

      {/* 힌트 */}
      <div className="mb-11">
        <Input
          type="text"
          label="힌트"
          placeholder="힌트를 입력해주세요"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          className="rounded-sm"
        />
      </div>

      <div className="flex justify-center gap-10 mt-6">
        <Button
          buttonStyle="white"
          onClick={handleCancel}
          className="w-[152px] h-[48px]"
        >
          취소하기
        </Button>
        <Button
          buttonStyle="smGreen"
          onClick={handleSubmit}
          className="w-[152px] h-[48px]"
          disabled={!title || !deadline || !previewImage || !description}
        >
          수정하기
        </Button>
      </div>
    </div>
  )
}
