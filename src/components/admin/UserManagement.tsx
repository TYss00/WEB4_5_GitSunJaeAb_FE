'use client';

import { useEffect, useState } from 'react';
import { UserCog } from 'lucide-react';
import { User, UserResponse } from '@/types/admin';

const TABS = ['전체 사용자', '관리자', '블랙 리스트'];

export default function UserManagement() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [selectedTab, setSelectedTab] = useState<string>('전체 사용자');
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

  const renderRole = (role: string) => {
    return role === 'ROLE_ADMIN' ? '관리자' : '일반';
  };

  // 블랙리스트 토글
  const toggleBlacklist = async (id: number) => {
    console.log('[블랙리스트 토글] ID:', id);
    const user = members.find((u) => u.id === id);
    if (!user) return;

    const updated = {
      ...user,
      blacklisted: !user.blacklisted,
    };

    try {
      const res = await fetch(`${API_BASE_URL}members/role/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 잘되나 체크용
      if (res.ok) {
        const result = await res.json();
        console.log('서버 응답:', result);
      }

      if (!res.ok) throw new Error('블랙리스트 업데이트 실패');

      setMembers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, blacklisted: updated.blacklisted } : u
        )
      );
    } catch (err) {
      console.error('블랙리스트 업데이트 실패:', err);
      alert('블랙리스트 상태를 변경할 수 없습니다.');
    }
  };

  // 관리자 권한 토글
  const toggleAdminRole = async (id: number) => {
    const user = members.find((u) => u.id === id);
    if (!user) return;

    const updated = {
      role: user.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN',
    };

    try {
      const res = await fetch(`${API_BASE_URL}members/blacklist/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 잘되나 체크용
      if (res.ok) {
        const result = await res.json();
        console.log('서버 응답:', result);
      }

      if (!res.ok) throw new Error('권한 변경 실패');

      setMembers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u))
      );
    } catch (err) {
      console.error('권한 변경 실패:', err);
      alert('관리자 권한을 변경할 수 없습니다.');
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
            {filteredMembers.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    selectedTab === '전체 사용자'
                      ? 9
                      : selectedTab === '관리자'
                      ? 5
                      : 5
                  }
                  className="py-6 text-center text-[var(--gray-300)]"
                >
                  사용자 목록이 없습니다.
                </td>
              </tr>
            ) : (
              filteredMembers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[var(--gray-100)] text-[var(--black)]"
                >
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.nickname}</td>
                  <td className="py-2 px-4">{user.email}</td>

                  {selectedTab === '전체 사용자' && (
                    <>
                      <td className="py-2 px-4">{renderRole(user.role)}</td>
                      <td className="py-2 px-4 text-center">
                        {user.blacklisted ? 'O' : 'X'}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => toggleBlacklist(user.id)}
                          className={`text-[13px] underline cursor-pointer ${
                            user.blacklisted
                              ? 'text-red-500'
                              : 'text-[var(--primary-300)]'
                          }`}
                        >
                          {user.blacklisted ? '취소' : '추가'}
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => toggleAdminRole(user.id)}
                          className={`text-[13px] underline cursor-pointer ${
                            user.role === 'ROLE_ADMIN'
                              ? 'text-red-500'
                              : 'text-[var(--primary-300)]'
                          }`}
                        >
                          {user.role === 'ROLE_ADMIN'
                            ? '권한 회수'
                            : '권한 부여'}
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => deleteMember(user.id)}
                          className="text-[13px] text-red-500 underline cursor-pointer"
                        >
                          삭제
                        </button>
                      </td>
                    </>
                  )}

                  {selectedTab === '관리자' && (
                    <>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => toggleAdminRole(user.id)}
                          className="text-[13px] text-red-500 underline"
                        >
                          회수
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => deleteMember(user.id)}
                          className="text-[13px] text-red-500 underline"
                        >
                          삭제
                        </button>
                      </td>
                    </>
                  )}

                  {selectedTab === '블랙 리스트' && (
                    <>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => toggleBlacklist(user.id)}
                          className="text-[13px] text-red-500 underline"
                        >
                          취소
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => deleteMember(user.id)}
                          className="text-[13px] text-red-500 underline"
                        >
                          삭제
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
