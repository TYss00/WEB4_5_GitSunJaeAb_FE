import ShareMapAdd from '@/components/sharemap/ShareMapAdd';

export default async function page() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseURL}/categories`, {
    next: { revalidate: 60 },
  });
  const categoriesData = await res.json();
  console.log(categoriesData);

  return <ShareMapAdd categories={categoriesData.categories} />;
}
