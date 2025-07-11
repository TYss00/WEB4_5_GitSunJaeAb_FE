'use client';

import { useState } from 'react';
import MypageCard from '../ui/card/MypageCard';

export default function MypagePost() {
  const [cards, setCards] = useState(
    Array(8)
      .fill(null)
      .map((_, idx) => ({
        id: idx,
        title: '서울 야경 따라',
        date: '2025.07.07',
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
      }))
  );

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
          type={card.type as '공개' | '비공개' | '퀘스트' | '공유'}
          mapImageUrl={card.imageUrl}
          isLiked={card.isLiked}
          onToggleLike={() => toggleLike(card.id)}
        />
      ))}
    </div>
  );
}
