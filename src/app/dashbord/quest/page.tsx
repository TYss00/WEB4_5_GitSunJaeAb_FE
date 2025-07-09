import HotQuest from '@/components/quest/HotQuest';
import QuestBanner from '@/components/quest/QuestBanner';
import QuestList from '@/components/quest/QuestList';

export default function QuestDashboardPage() {
  return (
    <>
      <QuestBanner />
      <HotQuest />
      <QuestList />
    </>
  );
}
