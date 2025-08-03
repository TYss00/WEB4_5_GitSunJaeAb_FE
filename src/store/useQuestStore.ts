import { create } from 'zustand';
import { MemberQuest } from '@/types/myprofile';

interface QuestState {
  quests: MemberQuest[];
  setQuests: (quests: MemberQuest[]) => void;
  addQuest: (quest: MemberQuest) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const useQuestStore = create<QuestState>((set) => ({
  quests: [],
  setQuests: (quests) => set({ quests }),
  addQuest: (quest) => set((state) => ({ quests: [quest, ...state.quests] })),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));

export default useQuestStore;
