import Loadmapdetail from '@/components/loadmap/LoadMapDetail'

export default async function page({ params }: { params: { id: number } }) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const res1 = await fetch(`${baseURL}/roadmaps/${params.id}`, {
    next: { revalidate: 60 }, // ISR
  })
  const res2 = await fetch(`${baseURL}/layers/roadmap?roadmapId=${params.id}`, {
    next: { revalidate: 60 }, // ISR
  })
  const res3 = await fetch(
    `${baseURL}/comments/roadmaps?roadmapId=${params.id}`,
    {
      next: { revalidate: 60 }, // ISR
    }
  )
  const roadmapData = await res1.json()
  const layersData = await res2.json()
  const commentsData = await res3.json()

  console.log('roadMapInfo:', roadmapData.roadmap)
  console.log('layerInfo:', layersData.layers)
  console.log('commentsInfo:', commentsData.comments)
  return (
    <>
      <Loadmapdetail
        roadMapInfo={roadmapData.roadmap}
        layerInfo={layersData.layers}
        commentsInfo={commentsData.comments}
      />
    </>
  )
}
