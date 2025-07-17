// hooks/useLayerMarkers.ts
import { useState, useCallback, useEffect } from 'react'
import type { LayerMarkers } from '@/types/type'

export default function useLayerMarkers(layers: string[]) {
  /* ① 상태 */
  const [selectedLayer, setSelectedLayer] = useState<string>('')
  const [layerMarkers, setLayerMarkers] = useState<LayerMarkers>({})

  /* ② 레이어 목록이 바뀌면 첫 번째 레이어 자동 선택 + 빈 배열 초기화 */
  useEffect(() => {
    if (layers.length && !selectedLayer) setSelectedLayer(layers[0])

    setLayerMarkers((prev) => {
      const copy = { ...prev }
      layers.forEach((l) => {
        if (!copy[l]) copy[l] = []
      })
      return copy
    })
  }, [layers])

  /* ③ 지도 클릭 → 좌표 → 주소 변환 → 마커 추가 */
  const addMarkerByLatLng = useCallback(
    (lat: number, lng: number) => {
      if (!selectedLayer) return
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== 'OK' || !results?.[0]) return
        const address = results[0].formatted_address

        setLayerMarkers((prev) => ({
          ...prev,
          [selectedLayer]: [
            ...(prev[selectedLayer] || []),
            { id: Date.now(), lat, lng, address },
          ],
        }))
      })
    },
    [selectedLayer]
  )

  /* ④ 마커 삭제 */
  const deleteMarker = useCallback((layer: string, markerId: number) => {
    setLayerMarkers((prev) => ({
      ...prev,
      [layer]: prev[layer].filter((m) => m.id !== markerId),
    }))
  }, [])

  return {
    /* state */
    selectedLayer,
    setSelectedLayer,
    layerMarkers,

    /* actions */
    addMarkerByLatLng,
    deleteMarker,
  }
}
