import Button from '../ui/Button';

export default function SharemapManage() {
  return (
    <section className="w-[732px] bg-[var(--white)] rounded-[10px] p-6 border border-[var(--gray-50)]">
      <div className="flex items-center justify-between font-semibold text-[var(--primary-300)] mb-[24px]">
        <span className="text-[18px]">공유지도 관리</span>
        <Button
          buttonStyle="smGreen"
          className="w-[100px] h-[28px] text-[14px]"
        >
          공유지도 추가
        </Button>
      </div>

      <div className="overflow-auto h-[600px] max-h-[455px]">
        <table className="w-full text-[14px]"></table>
      </div>
    </section>
  );
}
