'use client'

import { ChevronDown, Plus } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'
import LayerEdit from '../ui/layer/LayerEdit'

import useLayerAdd from '@/hooks/useLayerAdd'
import { useEffect, useState } from 'react'
import useLayerMarkersAdd from '@/hooks/useLayerMarkersAdd'
import { RoadmapWriteProps } from '@/types/type'
import useHashtags from '@/hooks/useHashtags'
import RoadMapGoogleWrite from './RoadMapGoogleWrite'

export default function LoadMapWrite({ categories }: RoadmapWriteProps) {
  const {
    layers,
    newLayerName,
    setNewLayerName,
    handleAddLayer,
    handleDeleteLayer,
  } = useLayerAdd()
  const {
    selectedLayer,
    setSelectedLayer,
    layerMarkers,
    addMarkerByLatLng,
    deleteMarker,
    addMarkerByAddress,
  } = useLayerMarkersAdd(layers)

  const {
    hashtagInput,
    setHashtagInput,
    hashtags,
    addHashtag,
    deleteHashtag,
    handleKeyDown,
  } = useHashtags()

  useEffect(() => {
    if (layers.length > 0 && !selectedLayer) {
      setSelectedLayer(layers[0]) // 첫 번째 레이어 자동 선택
    }
  }, [layers])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const isPublic = true
  const thumbnail = '썸네일 입력란도 추가해야하나'

  const handleSubmit = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    try {
      // 1. 로드맵 생성
      const roadmapRes = await fetch(`${baseURL}/roadmaps/personal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          categoryId,
          title,
          description,
          thumbnail,
          hashtags,
          isPublic,
        }),
      })
      const roadmap = await roadmapRes.json()
      console.log(roadmap)
      //로드맵 id가 응답 바디에 반환되면 레이어, 마커 생성 post 요청 추가 예정입니다.

      alert('로드맵이 성공적으로 생성되었습니다.')
    } catch (error) {
      console.error('로드맵 생성 실패', error)
      alert('로드맵 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <section className="flex w-full h-screen overflow-hidden">
      {/* 왼쪽 지도 */}
      <div className="w-4/6 bg-gray-200 relative">
        <RoadMapGoogleWrite
          selectedLayer={selectedLayer}
          layerMarkers={layerMarkers}
          onMapClick={addMarkerByLatLng}
          onMarkerDelete={deleteMarker}
        />
        <div className="absolute top-4 right-8 flex items-center gap-3 px-4 py-2 z-10">
          {/* 레이어 선택 */}
          <div className="relative w-[140px]">
            <select
              className="w-full h-[34px] text-sm bg-white border-none rounded pl-3 appearance-none"
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
            >
              {layers.map((layer, index) => (
                <option key={index} value={layer}>
                  {layer}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>
      </div>

      {/* 사이드 바 */}
      <div className="w-2/6 px-6 py-8 space-y-6 bg-white h-full overflow-y-auto scrollbar-none">
        {/* 화면 위치 */}
        <h1 className="font-semibold text-2xl">로드맵 작성하기</h1>
        {/* 카테고리 */}
        <div className="space-y-2">
          <label className="text-lg text-black">카테고리</label>
          <div className="relative">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              defaultValue=""
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요.
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-2">
          <label className="text-lg text-black">제목</label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 */}
        <div className="space-y-2">
          <label className="text-lg text-black">내용</label>
          <textarea
            placeholder="내용을 입력해주세요."
            className="h-[100px] w-full rounded-md border border-[var(--gray-50)] px-3 py-2 outline-none focus:border-[var(--primary-300)] focus:ring-1 focus:ring-[var(--primary-300)] placeholder:text-sm placeholder:text-[var(--gray-200)]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 해시태그 */}
        <div className="space-y-2">
          <label className="text-lg text-black">해시태그</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
              onClick={addHashtag}
            >
              <Plus size={25} />
            </Button>
          </div>
          <div className="flex gap-2 text-sm text-[#005C54] mt-1">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#e0f0ef] rounded-full flex items-center"
              >
                #{tag.name}
                <button
                  className="ml-1 text-black"
                  onClick={() => deleteHashtag(tag.name)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <Toggle label="공개" />

        {/* 레이어  */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl text-black">레이어 및 마커 관리</h3>
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              placeholder="새 레이어 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
              value={newLayerName}
              onChange={(e) => setNewLayerName(e.target.value)}
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
              onClick={handleAddLayer}
            >
              <Plus size={25} />
            </Button>
          </div>

          <div className="relative mb-3">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 선택
              </option>
              {/* 로그인 연결 후 api 연결 예정 */}
              <option>게임</option>
              <option>여행</option>
              <option>맛집</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>

          <div className="space-y-3">
            {layers.map((layerName, index) => (
              <LayerEdit
                key={index}
                title={layerName}
                markers={layerMarkers[layerName] || []}
                onDelete={() => handleDeleteLayer(index)}
                deleteMarker={deleteMarker}
                addMarkerByAddress={addMarkerByAddress}
              />
            ))}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button buttonStyle="white" className="text-sm w-[60px] h-[35px]">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              buttonStyle="smGreen"
              className="text-sm w-[60px] h-[35px]"
            >
              완료
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
