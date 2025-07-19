import Image from 'next/image';
import defaultCategoryImg from '../../../public/assets/defaultCategory.avif';

type Props = {
  image: string | null;
  name: string;
  description: string;
};

export default function LandingCategoryCard({
  image,
  name,
  description,
}: Props) {
  return (
    <div className="relative flex-1 flex items-end justify-center py-6 overflow-hidden">
      <Image
        src={image || defaultCategoryImg}
        alt={name}
        fill
        priority
        sizes="25vw"
        className="object-cover z-0"
      />
      <div className="absolute bottom-0 w-full h-[290px] bg-gradient-to-t from-[#5E4431] via-[#5E4431]/100 to-transparent flex items-end justify-center pb-[76px]">
        <span className="text-[var(--white)] text-[24px] font-medium">
          {name}
        </span>
        <p className="text-white text-sm mt-2">{description}</p>
      </div>
    </div>
  );
}
