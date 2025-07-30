import LoadMapWrite from '@/components/loadmap/LoadMapWrite'

export const metadata = {
  title: '로드맵 작성',
}

export default async function page() {
  return (
    <>
      <LoadMapWrite />
    </>
  )
}
