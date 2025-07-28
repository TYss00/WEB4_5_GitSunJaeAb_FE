import { useState, useCallback, useEffect } from 'react'
import type { LayerMarkers, MarkerData } from '@/types/type'

export default function useLayerMarkers(layers: string[]) {
  const [selectedLayer, setSelectedLayer] = useState<string>('')
  const [layerMarkers, setLayerMarkers] = useState<LayerMarkers>({})

  // 레이어 목록이 바뀌면 첫 번째 레이어 자동 선택 + 빈 배열 초기화
  useEffect(() => {
    if (layers.length && !selectedLayer) setSelectedLayer(layers[0])

    setLayerMarkers((prev) => {
      const updated = { ...prev }
      layers.forEach((layer) => {
        if (!updated[layer]) {
          updated[layer] = []
        }
      })
      return updated
    })
  }, [layers])

  // 지도 클릭 -> 좌표 -> 주소 변환 -> 마커 추가
  const addMarkerByLatLng = useCallback(
    (lat: number, lng: number) => {
      if (!selectedLayer) return
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const address = results[0].formatted_address
          const newMarker: MarkerData = {
            id: Date.now(),
            lat,
            lng,
            address,
            name: '',
            description: '',
            color: '#000000',
            customImageId: null,
          }
          setLayerMarkers((prev) => ({
            ...prev,
            [selectedLayer]: [...(prev[selectedLayer] || []), newMarker],
          }))
        }
      })
    },
    [selectedLayer]
  )

  // 빈마커 추가 -> 주소 -> 좌표 변환 -> 마커 추가
  const addMarkerByAddress = useCallback((layer: string, address: string) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results?.[0]) {
        const location = results[0].geometry.location
        const lat = location.lat()
        const lng = location.lng()
        const formattedAddress = results[0].formatted_address

        const newMarker: MarkerData = {
          id: Date.now(),
          lat,
          lng,
          address: formattedAddress,
          name: '',
          description: '',
          color: '#000000',
          customImageId: null,
        }

        setLayerMarkers((prev) => {
          const prevMarkers = prev[layer] || []

          // ✅ 수동 마커 조건: 주소가 비어있고 위도/경도가 0인 마커 삭제
          const filtered = prevMarkers.filter(
            (m) => !(m.lat === 0 && m.lng === 0)
          )

          return {
            ...prev,
            [layer]: [...filtered, newMarker],
          }
        })
      }
    })
  }, [])

  //수동 빈마커 추가
  const addManualMarker = useCallback((layer: string) => {
    const newMarker: MarkerData = {
      id: Date.now(),
      lat: 0,
      lng: 0,
      address: '주소를 입력하세요.',
      name: '',
      description: '',
      color: '#000000',
      customImageId: null,
    }

    setLayerMarkers((prev) => ({
      ...prev,
      [layer]: [...(prev[layer] || []), newMarker],
    }))
  }, [])
  const updateMarkerData = useCallback(
    (
      layerName: string,
      markerId: number,
      updatedFields: Partial<MarkerData>
    ) => {
      setLayerMarkers((prev) => {
        if (!prev[layerName]) return prev

        const updated = {
          ...prev,
          [layerName]: prev[layerName].map((marker) =>
            marker.id === markerId ? { ...marker, ...updatedFields } : marker
          ),
        }

        return updated
      })
    },
    []
  )

  // 마커 삭제
  const deleteMarker = useCallback((layer: string, markerId: number) => {
    setLayerMarkers((prev) => {
      const updated = { ...prev }
      updated[layer] = (prev[layer] || []).filter((m) => m.id !== markerId)
      return updated
    })
  }, [])

  const deleteLayer = useCallback((layerName: string) => {
    setLayerMarkers((prev) => {
      const updated = { ...prev }
      delete updated[layerName]
      return updated
    })
  }, [])
  return {
    /* state */
    selectedLayer,
    setSelectedLayer,
    layerMarkers,

    /* actions */
    addMarkerByLatLng,
    addMarkerByAddress,
    addManualMarker,
    updateMarkerData,
    deleteMarker,
    deleteLayer,
  }
}
