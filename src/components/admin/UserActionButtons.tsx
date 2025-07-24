'use client';

import { UserActionButton } from '@/types/admin';

export default function UserActionButtons({
  user,
  selectedTab,
  loadingUserId,
  onToggleBlacklist,
  onToggleAdminRole,
  onDeleteMember,
}: UserActionButton) {
  switch (selectedTab) {
    case '전체 사용자':
      return (
        <>
          <td className="py-2 px-4">
            {user.role === 'ROLE_ADMIN' ? '관리자' : '일반'}
          </td>
          <td className="py-2 px-14">
            {user.blacklisted ? 'O' : <span className="text-red-500">X</span>}
          </td>

          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onToggleBlacklist(user.id)}
              disabled={loadingUserId === user.id}
              className={`text-[13px] underline cursor-pointer ${
                user.blacklisted ? 'text-red-500' : 'text-[var(--primary-300)]'
              }`}
            >
              {user.blacklisted ? '취소' : '추가'}
            </button>
          </td>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onToggleAdminRole(user.id, user.role)}
              disabled={loadingUserId === user.id}
              className={`text-[13px] underline cursor-pointer ${
                user.role === 'ROLE_ADMIN'
                  ? 'text-red-500'
                  : 'text-[var(--primary-300)]'
              }`}
            >
              {user.role === 'ROLE_ADMIN' ? '권한 회수' : '권한 부여'}
            </button>
          </td>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onDeleteMember(user.id)}
              disabled={loadingUserId === user.id}
              className="text-[13px] text-red-500 underline cursor-pointer"
            >
              삭제
            </button>
          </td>
        </>
      );

    case '관리자':
      return (
        <>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onToggleAdminRole(user.id, user.role)}
              disabled={loadingUserId === user.id}
              className="text-[13px] text-red-500 underline cursor-pointer"
            >
              회수
            </button>
          </td>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onDeleteMember(user.id)}
              disabled={loadingUserId === user.id}
              className="text-[13px] text-red-500 underline cursor-pointer"
            >
              삭제
            </button>
          </td>
        </>
      );

    case '블랙 리스트':
      return (
        <>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onToggleBlacklist(user.id)}
              disabled={loadingUserId === user.id}
              className="text-[13px] text-red-500 underline cursor-pointer"
            >
              취소
            </button>
          </td>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => onDeleteMember(user.id)}
              disabled={loadingUserId === user.id}
              className="text-[13px] text-red-500 underline cursor-pointer"
            >
              삭제
            </button>
          </td>
        </>
      );

    default:
      return null;
  }
}
