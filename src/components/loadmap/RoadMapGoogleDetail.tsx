'use client'
import { MarkerData } from '@/types/type'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export default function RoadMapGoogleDetail({
  markers,
  center,
}: {
  markers: MarkerData[]
  center: { lat: number; lng: number }
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        fullscreenControl: false,

        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM, // 지도/위성 버튼 위치
        },

        streetViewControl: false, // 스트리트뷰 버튼 비활성화 예시
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.name}
        />
      ))}
    </GoogleMap>
  )
}
