import { AlertTriangle, X } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  confirmType: DeleteType;
};

type DeleteType =
  | 'post'
  | 'comment'
  | 'account'
  | 'notice'
  | 'marker'
  | 'category'
  | 'layer';

const deleteMessages: Record<
  DeleteType,
  { title: string; description: string }
> = {
  post: {
    title: '게시글을 삭제하시겠습니까?',
    description: '삭제된 게시글은 복구할 수 없습니다.',
  },
  comment: {
    title: '댓글을 삭제하시겠습니까?',
    description: '삭제된 댓글은 복구할 수 없습니다.',
  },
  account: {
    title: '회원 탈퇴하시겠습니까?',
    description: '탈퇴 시 계정 정보는 복구할 수 없습니다.',
  },
  notice: {
    title: '공지사항을 삭제하시겠습니까?',
    description: '삭제된 공지사항은 복구할 수 없습니다.',
  },
  marker: {
    title: '마커를 삭제하시겠습니까?',
    description: '삭제된 마커는 복구할 수 없습니다.',
  },
  category: {
    title: '카테고리를 삭제하시겠습니까?',
    description: '삭제된 카테고리는 복구할 수 없습니다.',
  },
  layer: {
    title: '찜한 레이어를 삭제하시겠습니까?',
    description: '삭제된 레이어는 복구할 수 없습니다.',
  },
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onDelete,
  confirmType,
}: ConfirmModalProps) {
  const { title, description } = deleteMessages[confirmType];

  return (
    <div>
      {isOpen && (
        <div className="fixed top-1 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[var(--white)] rounded-xl p-8 w-[370px] shadow-md relative text-center border border-[var(--gray-50)]">
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-[22px] right-[18px] text-[var(--black)] hover:text-[var(--red)] cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* 경고 아이콘 */}
            <div className="bg-[var(--red-50)] w-[50px] h-[50px] flex items-center justify-center rounded-[10px] mx-auto mb-4">
              <AlertTriangle className="text-[var(--red)]" />
            </div>

            {/* 메시지 */}
            <h2 className="text-lg font-semibold mb-[10px]">{title}</h2>
            <p className="text-sm text-[var(--gray-300)] mb-7">{description}</p>

            {/* 버튼 */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onDelete}
                className="bg-[var(--red)] text-[var(--white)] py-2 rounded-md hover:bg-[var(--red-100)] transition cursor-pointer"
              >
                삭제
              </button>
              <button
                onClick={onClose}
                className="border border-[var(--gray-100)] text-[var(--gray-300)] py-2 rounded-md hover:bg-[var(--gray-40)] transition cursor-pointer"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
