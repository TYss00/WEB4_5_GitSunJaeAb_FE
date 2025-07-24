'use client';

import { useEffect, useState } from 'react';
import { UserCog } from 'lucide-react';
import { User, UserResponse } from '@/types/admin';
import UserActionButtons from './UserActionButtons';
import { useAuthStore } from '@/store/useAuthStore';
import axiosInstance from '@/libs/axios';
import SearchInputs from '../ui/SearchInputs';

const TABS = ['전체 사용자', '관리자', '블랙 리스트'];

export default function UserManagement() {
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<string>('전체 사용자');
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axiosInstance.get<UserResponse>('members/list');
        if (Array.isArray(res.data.members)) {
          setMembers(res.data.members);
        } else {
          console.warn('회원 목록 데이터가 올바르지 않습니다:', res.data);
          setMembers([]);
        }
      } catch (err) {
        console.error('회원 목록 불러오기 실패:', err);
      }
    };

    fetchMembers();
  }, [user]);

  const filteredMembers = members
    .filter((member) => {
      if (selectedTab === '전체 사용자') return true;
      if (selectedTab === '관리자') return member.role === 'ROLE_ADMIN';
      if (selectedTab === '블랙 리스트') return member.blacklisted === true;
      return false;
    })
    .filter((member) =>
      [member.name, member.nickname, member.email].some((field) =>
        field.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );

  // 블랙리스트 토글
  const toggleBlacklist = async (id: number, currentStatus: boolean) => {
    setLoadingUserId(id);
    try {
      const res = currentStatus
        ? await axiosInstance.delete(`members/blacklist/${id}`)
        : await axiosInstance.put(`members/blacklist/${id}`);

      const data = res.data;

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
  const toggleAdminRole = async (
    id: number,
    currentRole: 'ROLE_ADMIN' | 'ROLE_USER'
  ) => {
    setLoadingUserId(id);
    try {
      const res =
        currentRole === 'ROLE_ADMIN'
          ? await axiosInstance.delete(`members/role/${id}`)
          : await axiosInstance.put(`members/role/${id}`);

      const data = res.data;
      const newRole = currentRole === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';

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
      await axiosInstance.delete(`/members/${id}`);

      setMembers((prev) => prev.filter((user) => user.id !== id));
      alert('사용자가 성공적으로 삭제되었습니다.');
    } catch (err) {
      console.error('회원 삭제 실패:', err);
      alert('회원 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-[1000px] h-[530px] bg-[var(--white)] rounded-lg p-4 flex flex-col justify-start border border-[var(--gray-50)]">
      {/* 상단 타이틀 */}
      <div className="flex items-center gap-2 text-[var(--primary-300)] font-bold text-xl mb-[16px]">
        <UserCog size={25} className="mr-1" />
        사용자 관리
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* 탭 영역 */}
        <div className="flex gap-[26px] text-[15px] font-medium">
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

        <SearchInputs
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          inputClassName="bg-[var(--gray-40)]"
        />
      </div>

      {/* 테이블 wrapper */}
      <div className="relative w-full border border-[var(--gray-100)] text-[14px]">
        <div className="max-h-[360px] overflow-y-auto pr-[8px]">
          <table className="w-full text-left table-fixed">
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '20%' }} />
              {selectedTab === '전체 사용자' && (
                <>
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '11%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '13%' }} />
                </>
              )}
              {selectedTab === '관리자' && (
                <>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </>
              )}
              {selectedTab === '블랙 리스트' && (
                <>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </>
              )}
            </colgroup>

            <thead className="sticky top-0 bg-[var(--gray-50)] text-[var(--gray-500)] z-10">
              <tr>
                <th className="py-2 px-4">이름</th>
                <th className="py-2 px-4">닉네임</th>
                <th className="py-2 px-4">이메일</th>
                {selectedTab === '전체 사용자' && (
                  <>
                    <th className="py-2 px-4">역할</th>
                    <th className="py-2 text-center">블랙리스트들</th>
                    <th className="py-2 px-4">블랙리스트</th>
                    <th className="py-2 px-7">관리자 권한</th>
                    <th className="py-2 px-8">회원탈퇴</th>
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
                    onToggleBlacklist={() =>
                      toggleBlacklist(user.id, user.blacklisted)
                    }
                    onToggleAdminRole={() =>
                      toggleAdminRole(user.id, user.role)
                    }
                    onDeleteMember={deleteMember}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
