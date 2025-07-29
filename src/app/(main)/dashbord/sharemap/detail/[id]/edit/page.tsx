import ShareMapEdit from '@/components/sharemap/ShareMapEdit';

export default async function page() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseURL}/categories`, {
    next: { revalidate: 60 },
  });
  const categoriesData = await res.json();

  return <ShareMapEdit categories={categoriesData.categories} />;
}
