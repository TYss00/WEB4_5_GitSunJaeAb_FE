export const dynamic = 'force-dynamic'
import LoadMapDetail from '@/components/loadmap/LoadMapDetail'

export default async function page({ params }: { params: { id: string } }) {
  return (
    <>
      <LoadMapDetail roadmapId={params.id} />
    </>
  )
}
