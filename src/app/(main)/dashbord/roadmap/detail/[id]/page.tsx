export const dynamic = 'force-dynamic'
import LoadMapDetail from '@/components/loadmap/LoadMapDetail'

export default async function page({ params }: { params: { id: string } }) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const roadmapId = params.id

  const [res1, res2, res3] = await Promise.all([
    fetch(`${baseURL}/roadmaps/${roadmapId}`, { next: { revalidate: 60 } }),
    fetch(`${baseURL}/layers/roadmap?roadmapId=${roadmapId}`, {
      next: { revalidate: 60 },
    }),
    fetch(`${baseURL}/comments/roadmaps?roadmapId=${roadmapId}`, {
      next: { revalidate: 60 },
    }),
  ])

  if (!res1.ok || !res2.ok || !res3.ok) {
    throw new Error('데이터를 불러오지 못했습니다')
  }

  const [roadmapData, layersData, commentsData] = await Promise.all([
    res1.json(),
    res2.json(),
    res3.json(),
  ])

  const layerIds = layersData.layers.map((layer) => layer.id)
  const markerRes = await Promise.all(
    layerIds.map((id) =>
      fetch(`${baseURL}/markers?layerId=${id}`, {
        next: { revalidate: 60 },
      })
    )
  )

  const markerData = await Promise.all(markerRes.map((res) => res.json()))
  const markersByLayer = layerIds.map((id, index) => ({
    layerId: id,
    markers: markerData[index].markers,
  }))

  return (
    <>
      <LoadMapDetail
        roadMapInfo={roadmapData.roadmap}
        layerInfo={layersData.layers}
        markersByLayer={markersByLayer}
        commentsInfo={commentsData.comments}
      />
    </>
  )
}
