export default function MypageLayer() {
  return (
    <>
      <table className="min-w-full text-sm text-left border-t border-[#606060]">
        <thead className="text-[#222222] text-base font-medium">
          <tr>
            <th className="py-3 px-4">게시글 이름</th>
            <th className="py-3 px-4">작성자</th>
            <th className="py-3 px-4">레이어명</th>
            <th className="py-3 px-4">적용된 게시글</th>
            <th className="py-3 px-4">수정하기</th>
            <th className="py-3 px-4">삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {Array(3)
            .fill(null)
            .map((_, idx) => (
              <tr
                key={idx}
                className="border-t border-b border-[#606060] text-sm"
              >
                <td className="py-3 px-4">삼국지 v.3</td>
                <td className="py-3 px-4">김나단</td>
                <td className="py-3 px-4">유비</td>
                <td className="py-3 px-4">삼국지 - ○○시대, ○○시대</td>
                <td className="py-3 px-4 text-[#222222] cursor-pointer">
                  수정
                </td>
                <td className="py-3 px-4 text-[#222222] cursor-pointer">
                  삭제
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
