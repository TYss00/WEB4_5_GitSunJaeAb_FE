'use client'

import { MapProps } from '@/types/type'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

//서울 좌표 기본값
const defaultCenter = { lat: 37.5665, lng: 126.978 }

export default function RoadMapGoogleWrite({
  center = defaultCenter,
  selectedLayer,
  layerMarkers,
  onMapClick,
  onMarkerDelete,
}: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={(e) => {
        if (selectedLayer === 'all') return
        const lat = e.latLng?.lat()
        const lng = e.latLng?.lng()
        if (lat && lng) onMapClick(lat, lng)
      }}
    >
      {selectedLayer === 'all'
        ? Object.entries(layerMarkers).flatMap(([layer, markers]) =>
            markers.map((m) => (
              <Marker
                key={`${layer}-${m.id}`}
                position={{ lat: m.lat, lng: m.lng }}
                onClick={() => onMarkerDelete(layer, m.id)}
              />
            ))
          )
        : (layerMarkers[selectedLayer] || []).map((m) => (
            <Marker
              key={m.id}
              position={{ lat: m.lat, lng: m.lng }}
              onClick={() => onMarkerDelete(selectedLayer, m.id)}
            />
          ))}
    </GoogleMap>
  )
}
