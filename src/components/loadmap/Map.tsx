'use client'

import { LayerMarkers } from '@/types/type'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useCallback, useMemo } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export default function Map({
  selectedLayer,
  layerMarkers,
  setLayerMarkers,
}: {
  selectedLayer: string
  layerMarkers: {
    [layerName: string]: {
      id: number
      lat: number
      lng: number
      address: string
    }[]
  }
  setLayerMarkers: React.Dispatch<React.SetStateAction<LayerMarkers>>
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  const center = useMemo(() => ({ lat: 37.5665, lng: 126.978 }), []) // 서울

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return

      const lat = event.latLng.lat()
      const lng = event.latLng.lng()

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const address = results[0].formatted_address

          setLayerMarkers((prev) => ({
            ...prev,
            [selectedLayer]: [
              ...(prev[selectedLayer] || []),
              { id: Date.now(), lat, lng, address },
            ],
          }))
        } else {
          console.error('Geocoding failed:', status)
        }
      })
    },
    [selectedLayer, setLayerMarkers]
  )

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={onMapClick}
    >
      {(layerMarkers[selectedLayer] || []).map((pos, idx) => (
        <Marker
          key={idx}
          position={pos}
          onClick={() => {
            setLayerMarkers((prev) => ({
              ...prev,
              [selectedLayer]: prev[selectedLayer].filter(
                (m) => m.id !== pos.id
              ),
            }))
          }}
        />
      ))}
    </GoogleMap>
  )
}
