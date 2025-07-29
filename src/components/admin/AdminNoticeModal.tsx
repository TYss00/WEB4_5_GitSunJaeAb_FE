'use client';

import { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AdminNoticeProps } from '@/types/admin';

const typeMap: Record<string, string> = {
  시스템: 'SYSTEM',
  이벤트: 'EVENT',
  업데이트: 'UPDATE',
  안내사항: 'ETC',
};

export default function AdminNoticeModal({
  onClose,
  initialData,
  onSubmit,
}: AdminNoticeProps) {
  const isEdit = !!initialData;

  const [type, setType] = useState<
    '시스템' | '이벤트' | '업데이트' | '안내사항'
  >('시스템');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      // 타입이 아직없어서 이처리
      setType(initialData.type ?? '시스템');
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const payload = {
      title,
      content,
      announcementType: typeMap[type] as 'SYSTEM' | 'EVENT' | 'UPDATE' | 'ETC',
    };

    try {
      if (isEdit) {
        await onSubmit(payload, initialData.id);
      } else {
        await onSubmit(payload);
      }

      onClose();
    } catch (err) {
      console.error('공지 처리 실패:', err);
      alert('공지 처리 중 오류 발생');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-[500px] space-y-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {isEdit ? '공지 수정' : '공지 작성'}
          </h3>
          <XCircle
            size={25}
            onClick={onClose}
            className="cursor-pointer text-[var(--gray-300)] hover:text-[var(--black)]"
          />
        </div>

        <div className="flex gap-4">
          {['시스템', '이벤트', '업데이트', '안내사항'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as '시스템' | '이벤트')}
              className={`px-4 py-2 rounded-full border text-sm ${
                type === t
                  ? 'bg-[var(--primary-300)] text-white border-[var(--primary-300)]'
                  : 'border-[var(--gray-200)] text-[var(--gray-400)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Input
          label="제목"
          placeholder="공지 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-base text-[var(--black)]">내용</label>
          <textarea
            rows={5}
            placeholder="공지 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-[var(--gray-50)] px-3 py-2 rounded-lg outline-none focus:border-[var(--primary-300)] focus:ring-1 focus:ring-[var(--primary-300)] placeholder:text-sm placeholder:text-[var(--gray-200)]"
          />
        </div>

        <div className="flex justify-end">
          <Button buttonStyle="green" onClick={handleSubmit}>
            {isEdit ? '수정 완료' : '등록'}
          </Button>
        </div>
      </div>
    </div>
  );
}
