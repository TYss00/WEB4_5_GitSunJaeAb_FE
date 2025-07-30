'use client';

import { RoadMapCardProps } from '@/types/type';
import { truncateText } from '@/utils/truncateText';
import { Heart, Eye, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '@/libs/axios';
import { toast } from 'react-toastify';

export default function RoadMapCard({
  id,
  category,
  mapImageUrl,
  title,
  description,
  hashtags,
  profileImgUrl,
  author,
  viewCount,
  shareCount,
  className,
  isBookmarked,
  bookmarkId,
}: RoadMapCardProps) {
  const [isLiked, setIsLiked] = useState(isBookmarked ?? false);
  const [currentBookmarkId, setCurrentBookmarkId] = useState<number | null>(
    bookmarkId ?? null
  );

  const router = useRouter();

  const truncatedTitle = truncateText(title, 16);
  const truncatedDescription = truncateText(description, 22);

  const handleClick = () => {
    router.push(`/dashbord/roadmap/detail/${id}`);
  };

  const likeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      if (!isLiked) {
        const res = await axiosInstance.post(`/bookmarks/${id}`);
        if (res.data.bookmarkId) {
          setCurrentBookmarkId(res.data.bookmarkId);
          toast.success('좋아요를 누르셨습니다.');
          setIsLiked(true);
        }
      } else {
        if (currentBookmarkId !== null) {
          await axiosInstance.delete(`/bookmarks/${currentBookmarkId}`);
          setCurrentBookmarkId(null);
          toast.success('좋아요를 취소하셨습니다.');
          setIsLiked(false);
        }
      }
    } catch (err) {
      console.error('북마크 처리 실패:', err);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col w-[330px] h-[278px] border border-[var(--gray-100)] rounded-[10px] overflow-hidden cursor-pointer vtransition-all duration-300 ease-in-out 
           hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div
        className="w-full h-19/40 p-[10px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mapImageUrl})` }}
      >
        <span className="bg-[var(--primary-300)] rounded-[10px] px-[10px] py-[5px] text-[11px] text-[var(--white)] font-semibold">
          {category}
        </span>
      </div>
      <div className="flex flex-col gap-[5px] justify-center w-full h-21/40 px-[15px] py-[5px] bg-white">
        <div className="flex justify-between w-full">
          <span className="text-[20px] font-semibold line-clamp-1">
            {truncatedTitle}
          </span>
          <button onClick={likeHandler}>
            <Heart
              size={20}
              fill={isLiked ? 'red' : 'none'}
              color="black"
              strokeWidth={isLiked ? 0 : 2}
            />
          </button>
        </div>
        <span className="text-[16px] line-clamp-2 min-h-[40px]">
          {truncatedDescription}
        </span>
        <div className="flex gap-[10px] flex-wrap min-h-[20px]">
          {hashtags.slice(0, 5).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] text-[var(--primary-300)] font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between w-full ">
          <div className="flex items-center gap-[5px]">
            <span
              className="size-[20px] rounded-full"
              style={{
                backgroundImage: `url(${profileImgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <span className="text-[10px] text-[var(--gray-200)]">{author}</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="flex text-[10px] text-[var(--gray-200)] gap-[5px]">
              <Eye size={15} color="var(--gray-200)" /> {viewCount}
            </span>
            <span className="flex text-[10px] text-[var(--gray-200)] gap-[5px]">
              <Share2 size={15} color="var(--gray-200)" /> {shareCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
