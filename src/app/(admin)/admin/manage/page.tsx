import CategoryManage from '@/components/admin/CategoryManage';
import MarkerManage from '@/components/admin/MarkerManage';

export default function page() {
  return (
    <>
      <main className="w-full flex justify-center pt-10 pb-15">
        <div className="w-[1102px] flex gap-[18px]">
          {/* 왼쪽 영역 */}
          <div className="w-full flex flex-col gap-[18px]">
            <CategoryManage />
            <MarkerManage />
          </div>

          {/* 오른쪽 영역 */}
          {/* <div className="w-[352px] shrink-0 flex flex-col gap-[18px]">
            <AchievementManage />
          </div> */}
        </div>
      </main>
    </>
  );
}
