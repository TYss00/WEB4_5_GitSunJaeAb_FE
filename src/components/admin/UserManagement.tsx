'use client';

import { useEffect, useState } from 'react';
import { UserCog } from 'lucide-react';
import { User, UserResponse } from '@/types/admin';
import UserActionButtons from './UserActionButtons';

const TABS = ['전체 사용자', '관리자', '블랙 리스트'];

export default function UserManagement() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [selectedTab, setSelectedTab] = useState<string>('전체 사용자');
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}members/list`)
      .then((res) => res.json())
      .then((data: UserResponse) => {
        if (Array.isArray(data.members)) {
          setMembers(data.members);
        } else {
          console.warn('회원 목록 데이터가 올바르지 않습니다:', data);
          setMembers([]);
        }
      })
      .catch((err) => console.error('회원 목록 불러오기 실패:', err));
  }, [API_BASE_URL]);

  const filteredMembers = members.filter((member) => {
    if (selectedTab === '전체 사용자') return true;
    if (selectedTab === '관리자') return member.role === 'ROLE_ADMIN';
    if (selectedTab === '블랙 리스트') return member.blacklisted === true;
    return false;
  });

  // 블랙리스트 토글
  const toggleBlacklist = async (id: number) => {
    setLoadingUserId(id);
    try {
      const res = await fetch(`${API_BASE_URL}members/blacklist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || '블랙리스트 업데이트 실패');

      setMembers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, blacklisted: !u.blacklisted } : u
        )
      );

      alert(data.message || '블랙리스트 상태가 변경되었습니다.');
    } catch (err) {
      console.error('블랙리스트 업데이트 실패:', err);
      alert('블랙리스트 상태를 변경할 수 없습니다.');
    } finally {
      setLoadingUserId(null);
    }
  };

  // 관리자 권한 토글
  const toggleAdminRole = async (id: number) => {
    const user = members.find((u) => u.id === id);
    if (!user) return;

    setLoadingUserId(id);
    try {
      const res = await fetch(`${API_BASE_URL}members/role/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '권한 변경 실패');

      const newRole = user.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';

      setMembers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );

      alert(data.message || '관리자 권한이 변경되었습니다.');
    } catch (err) {
      console.error('권한 변경 실패:', err);
      alert('관리자 권한을 변경할 수 없습니다.');
    } finally {
      setLoadingUserId(null);
    }
  };

  const deleteMember = async (id: number) => {
    const confirmDelete = confirm('정말로 이 사용자를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}members?memberId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('삭제 실패');

      setMembers((prev) => prev.filter((user) => user.id !== id));
      alert('사용자가 성공적으로 삭제되었습니다.');
    } catch (err) {
      console.error('회원 삭제 실패:', err);
      alert('회원 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-[1000px] bg-[var(--white)] rounded-lg p-4 flex flex-col justify-start border border-[var(--gray-50)]">
      {/* 상단 타이틀 */}
      <div className="flex items-center gap-2 text-[var(--primary-300)] font-semibold text-[18px] mb-[16px]">
        <UserCog size={20} className="mr-1" />
        사용자 관리
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-[26px] mb-4 text-[15px] font-medium">
        {TABS.map((tab) => (
          <span
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`cursor-pointer pb-1 ${
              selectedTab === tab
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-[var(--gray-300)]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* 사용자 테이블 */}
      <div>
        <table className="w-full text-left border border-[var(--gray-100)] text-[14px]">
          <thead>
            <tr className="bg-[var(--gray-50)] text-[var(--gray-500)]">
              <th className="py-2 px-4">이름</th>
              <th className="py-2 px-4">닉네임</th>
              <th className="py-2 px-4">이메일</th>

              {selectedTab === '전체 사용자' && (
                <>
                  <th className="py-2 px-4">역할</th>
                  <th className="py-2 px-4 text-center">블랙리스트 여부</th>
                  <th className="py-2 px-4 text-center">블랙리스트</th>
                  <th className="py-2 px-4 text-center">관리자 권한</th>
                  <th className="py-2 px-4 text-center">회원탈퇴</th>
                </>
              )}

              {selectedTab === '관리자' && (
                <>
                  <th className="py-2 px-4 text-center">관리자 권한</th>
                  <th className="py-2 px-4 text-center">회원탈퇴</th>
                </>
              )}

              {selectedTab === '블랙 리스트' && (
                <>
                  <th className="py-2 px-4 text-center">블랙리스트</th>
                  <th className="py-2 px-4 text-center">회원탈퇴</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[var(--gray-100)] text-[var(--black)]"
              >
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.nickname}</td>
                <td className="py-2 px-4">{user.email}</td>

                <UserActionButtons
                  user={user}
                  selectedTab={selectedTab}
                  loadingUserId={loadingUserId}
                  onToggleBlacklist={toggleBlacklist}
                  onToggleAdminRole={toggleAdminRole}
                  onDeleteMember={deleteMember}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
