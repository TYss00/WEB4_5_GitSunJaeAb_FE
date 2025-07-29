type Props = {
  repeat?: number;
};

export default function SkeletonCategoryCard({ repeat = 5 }: Props) {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 animate-pulse w-[200px] h-[200px] rounded-xl"
          />
        ))}
    </>
  );
}
