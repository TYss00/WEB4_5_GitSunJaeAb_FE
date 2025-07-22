'use client'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

//서울 좌표 기본값
const defaultCenter = { lat: 37.5665, lng: 126.978 }

export default function RoadMapGoogleDetail() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={13}
    ></GoogleMap>
  )
}
