'use client'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export default function RoadMapGoogleDetail({
  markers,
  center,
}: {
  markers: any[]
  center: { lat: number; lng: number }
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
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
