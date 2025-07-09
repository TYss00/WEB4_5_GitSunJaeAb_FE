import AchievementManage from '@/components/admin/AchievementManage';
import CategoryManage from '@/components/admin/CategoryManage';
import ReportTable from '@/components/admin/ReportTable';
import SharedMapStats from '@/components/admin/SharedMapStats';
import UserManagement from '@/components/admin/UserManagement';

export default function page() {
  return (
    <>
      <main className="w-full flex justify-center pt-10 pb-15">
        <div className="w-[1102px] flex gap-[18px]">
          {/* 왼쪽 영역 */}
          <div className="w-[732px] flex flex-col gap-[18px]">
            <ReportTable />
            <CategoryManage />
          </div>

          {/* 오른쪽 영역 */}
          <div className="w-[352px] shrink-0 flex flex-col gap-[18px]">
            <UserManagement />
            <SharedMapStats />
            <AchievementManage />
          </div>
        </div>
      </main>
    </>
  );
}
