'use client'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useCallback, useMemo, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  })

  const center = useMemo(() => ({ lat: 37.5665, lng: 126.978 }), []) // 서울

  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([])

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return

    const lat = event.latLng.lat()
    const lng = event.latLng.lng()

    setMarkers((prev) => [...prev, { lat, lng }])
  }, [])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={onMapClick}
    >
      {markers.map((position, idx) => (
        <Marker key={idx} position={position} />
      ))}
    </GoogleMap>
  )
}
