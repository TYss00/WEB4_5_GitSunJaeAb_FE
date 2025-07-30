'use client'

import { ChevronDown, ImagePlus, Plus } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'
import LayerEdit from '../ui/layer/LayerEdit'
import useLayerAdd from '@/hooks/useLayerAdd'
import { useEffect, useState } from 'react'
import useLayerMarkersAdd from '@/hooks/useLayerMarkersAdd'
import { CategoryInfo, MyZzimLayersInfo } from '@/types/type'
import useHashtags from '@/hooks/useHashtags'
import RoadMapGoogleWrite from './RoadMapGoogleWrite'
import axiosInstance from '@/libs/axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { reverseGeocode } from '@/libs/geocode'

export default function LoadMapWrite() {
  const { layers, setLayers, newLayerName, setNewLayerName, handleAddLayer } =
    useLayerAdd()
  const {
    selectedLayer,
    setSelectedLayer,
    layerMarkers,
    setLayerMarkers,
    addMarkerByLatLng,
    deleteMarker,
    addMarkerByAddress,
    updateMarkerData,
    addManualMarker,
    deleteLayer,
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
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get(`/categories`)
        const categories = await res.data
        setCategories(categories.categories)
      } catch (err) {
        console.error('카테고리 조회 오류', err)
      }
    }

    const getMyZzimLayers = async () => {
      try {
        const res = await axiosInstance.get(`/layers/member`)
        const MyZzimLayers = await res.data
        setMyZzimLayers(MyZzimLayers.layers)
      } catch (err) {
        console.log('회원 찜 레이어 조회 오류', err)
      }
    }
    getCategories()
    getMyZzimLayers()
  }, [])

  const handleDeleteLayer = (index: number) => {
    const layerName = layers[index]

    setLayers((prev) => prev.filter((_, i) => i !== index))
    deleteLayer(layerName) // layerMarkers에서도 삭제
  }

  useEffect(() => {
    if (layers.length > 0 && !selectedLayer) {
      setSelectedLayer(layers[0]) // 첫 번째 레이어 자동 선택
    }
  }, [layers, setSelectedLayer, selectedLayer])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<CategoryInfo[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [myZzimLayers, setMyZzimLayers] = useState<MyZzimLayersInfo[]>([])
  const router = useRouter()

  const handleIsPublic = (value: boolean) => {
    setIsPublic(value)
  }

  //레이어 fork
  const handleZzimLayerSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = e.target.value
    const selectedZzimLayer = myZzimLayers.find((l) => l.name === selectedName)

    if (!selectedZzimLayer) return

    // 이미 같은 이름의 레이어가 존재하면 중복 추가 방지
    if (layers.includes(selectedName)) {
      toast.warn('이미 추가된 레이어입니다.')
      return
    }

    // 1. layers에 추가
    setLayers((prev) => [...prev, selectedName])

    // 2. 마커에 주소 변환 추가
    try {
      const markerWithAddressPromises = selectedZzimLayer.markers.map(
        async (m) => {
          const address = await reverseGeocode(m.lat, m.lng)
          return {
            id: m.id,
            name: m.name || '',
            description: '',
            lat: m.lat,
            lng: m.lng,
            address, // 변환된 주소
            color: '#000000',
            customImageId: null,
          }
        }
      )

      const markersWithAddress = await Promise.all(markerWithAddressPromises)

      // 3. layerMarkers에 반영
      setLayerMarkers((prev) => ({
        ...prev,
        [selectedName]: markersWithAddress,
      }))
    } catch (err) {
      console.error('주소 변환 중 오류 발생:', err)
      toast.error('주소 변환 중 오류가 발생했습니다.')
    }
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      const requestData = {
        categoryId,
        title,
        description,
        isPublic,
        hashtags,
      }
      formData.append(
        'request',
        new Blob([JSON.stringify(requestData)], { type: 'application/json' })
      )

      if (thumbnail instanceof File) {
        formData.append('imageFile', thumbnail)
      }
      // 1. 로드맵 생성
      const roadmapRes = await axiosInstance.post(
        `/roadmaps/personal`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const roadmap = await roadmapRes.data
      console.log(roadmap)
      const roadMapId = roadmap.roadmapId
      console.log(roadMapId)

      //2. 레이어 생성 및 마커 생성
      for (let i = 0; i < layers.length; i++) {
        const layerName = layers[i]

        const layerRes = await axiosInstance.post(
          `/layers?targetRoadmapId=${roadMapId}`,
          {
            name: layerName,
            description: '',
            layerSeq: i + 1,
            originalLayerId: null,
            roadmapId:roadMapId,
            Zzimed: false,
          }
        )

        const layerId = layerRes.data.layer.id
        console.log('생성된 레이어:', layerRes.data.layer.id)

        //3. 해당 레이어에 속한 마커들 추출
        const markers = layerMarkers[layerName] || []

        // 4. 마커 생성 요청
        for (let j = 0; j < markers.length; j++) {
          const marker = markers[j]
          const markerReqBody = {
            name: marker.name || '이름 없음',
            description: marker.description || '설명없음',
            address: marker.address || '주소없음',
            lat: marker.lat,
            lng: marker.lng,
            color: marker.color || '#000000',
            customImageId: marker.customImageId,
            tempUUID: crypto.randomUUID(),
            markerSeq: j + 1,
            layerId: layerId,
          }

          const markerRes = await axiosInstance.post('/markers', markerReqBody)
          console.log('마커 생성 응답:', markerRes.data)
        }
      }
      // 업적 메시지 토스트 띄우기
      const message = roadmap.message ?? ''
      if (message.includes('업적')) {
        toast.success(message)
      } else {
        toast.success('로드맵이 성공적으로 생성되었습니다.')
      }
    } catch (error) {
      console.error('로드맵 생성 실패', error)
      toast.error('로드맵 생성 중 오류가 발생했습니다.')
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
        <div className="absolute top-[3px] right-15 flex items-center gap-3 px-4 py-2 z-10">
          {/* 레이어 선택 */}
          <div className="relative w-[180px] shadow-sm">
            <select
              className="w-full h-[40px] text-sm bg-white border-none rounded-[3px] px-3 appearance-none focus:outline-none"
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
            >
              <option value="all">전체</option>
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

        {/* 썸네일 */}
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setThumbnail(e.target.files[0])
            }
          }}
        />
        <label className="text-lg text-black">썸네일 이미지</label>
        <label
          htmlFor="thumbnail"
          className="relative flex justify-center items-center w-full h-[300px] bg-gray-100 rounded-[5px] cursor-pointer"
        >
          {thumbnail ? (
            // 썸네일이 있을 경우: 이미지 미리보기
            <Image
              src={URL.createObjectURL(thumbnail)}
              alt="썸네일 미리보기"
              fill
              className="object-cover"
            />
          ) : (
            // 썸네일 없을 경우: 기본 업로드 아이콘
            <ImagePlus
              width={40}
              height={40}
              className="text-[var(--gray-200)]"
            />
          )}
        </label>

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

        <Toggle label="공개" onChange={handleIsPublic} />

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
              onChange={handleZzimLayerSelect}
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
            >
              <option value="">레이어 선택</option>
              {myZzimLayers?.map((layer: MyZzimLayersInfo) => (
                <option key={layer.id} value={layer.name}>
                  {layer.name}
                </option>
              ))}
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
                addManualMarker={addManualMarker}
                updateMarkerData={updateMarkerData}
              />
            ))}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={() => router.back()}
              buttonStyle="white"
              className="w-[71px] h-[40px] text-lg font-medium"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              buttonStyle="smGreen"
              className="w-[71px] h-[40px] text-lg font-medium"
            >
              완료
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
