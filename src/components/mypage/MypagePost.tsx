'use client';

import { useState } from 'react';
import MypageCard from '../ui/card/MypageCard';
import { MypagePostProps } from '@/types/type';

export default function MypagePost({ activeTab }: MypagePostProps) {
  const initialCards = Array(8)
    .fill(null)
    .map((_, idx) => ({
      id: idx,
      title: '서울 야경 따라',
      date: '2025.07.07',
      author: activeTab === '작성글' ? undefined : '닉네임',
      profileImgUrl: activeTab === '작성글' ? undefined : '/assets/google.svg',
      type:
        idx % 4 === 0
          ? '공개'
          : idx % 4 === 1
          ? '비공개'
          : idx % 4 === 2
          ? '퀘스트'
          : '공유',
      imageUrl: '/map.png',
      isLiked: idx % 3 === 0,
    }));

  const [cards, setCards] = useState(initialCards);

  // activeTab이 바뀌었을 때 카드 갱신
  if (
    (activeTab === '작성글' && cards[0]?.author !== undefined) ||
    (activeTab !== '작성글' && cards[0]?.author === undefined)
  ) {
    setCards(
      cards.map((card) => ({
        ...card,
        author: activeTab === '작성글' ? undefined : '닉네임',
        profileImgUrl:
          activeTab === '작성글' ? undefined : '/assets/google.svg',
      }))
    );
  }

  const toggleLike = (id: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => (
        <MypageCard
          key={card.id}
          title={card.title}
          date={card.date}
          {...(card.author ? { author: card.author } : {})}
          {...(card.profileImgUrl ? { profileImgUrl: card.profileImgUrl } : {})}
          type={card.type as '공개' | '비공개' | '퀘스트' | '공유'}
          mapImageUrl={card.imageUrl}
          isLiked={card.isLiked}
          onToggleLike={() => toggleLike(card.id)}
        />
      ))}
    </div>
  );
}
