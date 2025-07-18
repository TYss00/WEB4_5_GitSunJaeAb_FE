import { create } from 'zustand';

type ProfileEditState = {
  nickname: string;
  profileImage: string | null;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  setNickname: (nickname: string) => void;
  setProfileImage: (image: string | null) => void;

  setCurrentPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;

  reset: () => void;
};

export const useProfileEditStore = create<ProfileEditState>((set) => ({
  nickname: '',
  profileImage: null,

  currentPassword: '',
  newPassword: '',
  confirmPassword: '',

  setNickname: (nickname) => set({ nickname }),
  setProfileImage: (profileImage) => set({ profileImage }),

  setCurrentPassword: (v) => set({ currentPassword: v }),
  setNewPassword: (v) => set({ newPassword: v }),
  setConfirmPassword: (v) => set({ confirmPassword: v }),

  reset: () =>
    set({
      nickname: '',
      profileImage: null,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }),
}));
