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
        <table className="w-full text-[14px]">
          <thead>
            <tr className="text-[var(--black)] border-b border-[var(--gray-50)]">
              <th className="text-left py-2">피신고자</th>
              <th className="text-left py-2">신고자</th>
              <th className="text-left py-2">유형</th>
              <th className="text-left py-2">날짜</th>
              <th className="text-left py-2">상태</th>
              <th className="text-left py-2">조치</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="border-b border-[var(--gray-50)]">
                <td className="py-2">홍길동</td>
                <td>지지</td>
                <td>허위 게시글</td>
                <td>2025.07.07</td>
                <td className="text-left align-middle pr-[12px]">
                  <span className="inline-block bg-[#FFF4F4] text-[var(--red)] px-[10px] py-[2px] rounded-full text-[13px]">
                    대기
                  </span>
                </td>

                <td className="text-[var(--blue)]">
                  <span className="mr-2 cursor-pointer">상세 보기</span>
                  <button className="text-[var(--primary-200)] mr-1">✔</button>
                  <button className="text-[var(--red)]">✖</button>
                </td>
              </tr>
            ))}
            <tr className="border-b border-[#F0F0F0]">
              <td className="py-2">홍길동</td>
              <td>지지</td>
              <td>허위 게시글</td>
              <td>2025.07.07</td>
              <td className="text-left align-middle pr-[12px]">
                <span className="inline-block bg-[#F4FFF4] text-[var(--primary-200)] px-[10px] py-[2px] rounded-full text-[13px]">
                  완료
                </span>
              </td>

              <td className="text-[var(--blue)]">
                <span className="mr-2 cursor-pointer">상세 보기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
