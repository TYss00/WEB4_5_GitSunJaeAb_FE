import LoadMapWrite from '@/components/loadmap/LoadMapWrite'

export const metadata = {
  title: '로드맵 작성',
}

export default async function page() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const categoryRes = await fetch(`${baseURL}/categories`, {
    next: { revalidate: 60 },
  })

  const categoriesData = await categoryRes.json()

  return (
    <>
      <LoadMapWrite categories={categoriesData.categories} />
    </>
  )
}
