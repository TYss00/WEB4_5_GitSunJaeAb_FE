'use client';

import React from 'react';

export default function ReportDetailSkeleton({
  contentType,
}: {
  contentType: '퀘스트' | '지도' | '마커';
}) {
  return (
    <>
      <div className="text-[15px] font-medium mb-1">제목</div>
      <div className="bg-gray-200 h-[36px] rounded px-3 flex items-center text-sm animate-pulse"></div>

      <div className="text-[15px] font-medium mt-4 mb-1">내용</div>
      <div className="bg-gray-200 h-[80px] rounded px-3 py-2 text-sm text-gray-300 animate-pulse" />

      {contentType === '퀘스트' && (
        <>
          <div className="text-[15px] font-medium mt-4 mb-1">퀘스트 이미지</div>
          <div className="bg-gray-200 h-[400px] rounded animate-pulse" />
        </>
      )}

      {(contentType === '지도' || contentType === '마커') && (
        <>
          <div className="text-[15px] font-medium mt-4 mb-1">지도</div>
          <div className="bg-gray-200 h-[400px] rounded animate-pulse" />
        </>
      )}
    </>
  );
}
