'use client';

import { XCircle } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import ProfileTab from './profiletab/ProfileTab';
import InterestTab from './profiletab/InterestTab';
import AchievementTab from './profiletab/AchievementTab';
import PasswordTab from './profiletab/PasswordTab';
import { useProfileEditStore } from '@/store/profileeditStore';
import axiosInstance from '@/libs/axios';
import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-toastify';
import ConfirmModal from '../common/modal/ConfirmModal';

export default function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('프로필');
  const [isSaving, setIsSaving] = useState(false);
  const fetchMember = useProfileStore((state) => state.fetchMember);
  const user = useAuthStore((state) => state.user);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClose = () => {
    useProfileEditStore.getState().reset();
    onClose();
  };

  const handleWithdraw = async () => {
    try {
      await axiosInstance.delete('/members/withdraw');
      toast.success('회원탈퇴가 완료되었습니다.');
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error('회원탈퇴 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    const { nickname, profileImage } = useProfileEditStore.getState();
    if (isSaving) return;
    setIsSaving(true);

    try {
      if (activeTab === '프로필') {
        const formData = new FormData();
        if (nickname === user?.nickname) {
          toast.error('이미 사용 중인 닉네임입니다.');
          setIsSaving(false);
          return;
        }

        formData.append(
          'member',
          new Blob([JSON.stringify({ nickname })], { type: 'application/json' })
        );
        if (profileImage instanceof File) {
          formData.append('imageFile', profileImage);
        }

        await axiosInstance.put('/members', formData);

        const res = await axiosInstance.get('/members');
        useAuthStore.getState().setUser(res.data.memberDetailDto);
        await fetchMember();

        toast.success('저장 완료');
      } else if (activeTab === '비밀번호') {
        const { password, newPassword, confirmPassword } =
          useProfileEditStore.getState();

        if (!password || !newPassword || !confirmPassword) {
          toast.error('모든 비밀번호 필드를 입력해주세요.');
          setIsSaving(false);
          return;
        }

        if (newPassword !== confirmPassword) {
          toast.error('새 비밀번호와 확인이 일치하지 않습니다.');
          setIsSaving(false);
          return;
        }

        const verifyRes = await axiosInstance.post('/members/password/verify', {
          password,
        });

        if (verifyRes.data.message == '비밀번호가 일치하지 않습니다.') {
          toast.error('현재 비밀번호가 일치하지 않습니다.');
          setIsSaving(false);
          return;
        }

        await axiosInstance.put('/auth/password', {
          password: newPassword,
        });

        toast.success('비밀번호가 성공적으로 변경되었습니다.');
      } else if (activeTab === '관심 분야') {
        const { selectedCategoryIds } = useProfileEditStore.getState();
        await axiosInstance.put('/members/interests', {
          categoryId: selectedCategoryIds,
        });
        await fetchMember();
        toast.success('관심 분야가 저장되었습니다.');
      }

      handleClose();
    } catch (err) {
      console.error(err);
      toast.error('저장 실패');
    } finally {
      setIsSaving(false);
    }
  };

  const visibleTabs = [
    '프로필',
    ...(user?.provider === null ? ['비밀번호'] : []),
    '관심 분야',
    '업적',
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="w-[500px] h-[700px] px-[25px] pt-[20px] pb-[20px] flex flex-col justify-between items-center gap-[15px] bg-[var(--gray-40)] shadow-[rgba(0,0,0,0.1)_0px_4px_20px] rounded-xl">
        <div className="w-full flex justify-end">
          <XCircle
            size={25}
            onClick={handleClose}
            className="cursor-pointer text-[var(--gray-300)] hover:text-[var(--black)]"
          />
        </div>

        <div className="w-full flex justify-center gap-[15px] mb-2">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium px-3 py-[6px] rounded-full transition-all
                ${
                  activeTab === tab
                    ? 'text-white bg-[var(--primary-300)]'
                    : 'text-[var(--gray-300)] hover:bg-[var(--gray-50)]'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className={`flex-1 w-full bg-white rounded-lg ${
            activeTab !== '업적' ? 'p-10 pt-10' : 'p-4'
          }`}
        >
          {activeTab === '프로필' && <ProfileTab />}
          {activeTab === '비밀번호' && user?.provider === null && (
            <PasswordTab />
          )}
          {activeTab === '관심 분야' && <InterestTab />}
          {activeTab === '업적' && <AchievementTab />}
        </div>

        {activeTab !== '업적' && (
          <div className="w-full flex items-center justify-between mt-4">
            <div className="w-[180px]" />
            <div className="flex justify-center flex-1">
              <Button
                buttonStyle="green"
                className="w-[180px] h-[40px] px-6"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? '저장 중' : '저장'}
              </Button>
            </div>
            <div className="w-[180px] flex justify-end">
              {activeTab === '프로필' && (
                <button
                  className="text-sm text-[var(--gray-200)] underline underline-offset-2 cursor-pointer h-[40px] flex items-center"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  회원탈퇴
                </button>
              )}
            </div>
          </div>
        )}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onDelete={handleWithdraw}
          confirmType="account"
        />
      </div>
    </div>
  );
}
