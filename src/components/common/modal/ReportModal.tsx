import Button from '@/components/ui/Button'
import { Siren, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ReportModal({ onClose }: { onClose: () => void }) {
  const reportReasons = [
    '성적인 콘텐츠',
    '스팸 또는 혼동을 야기하는 콘텐츠',
    '폭력적 또는 혐오스러운 콘텐츠',
    '증오 또는 악의적인 콘텐츠',
    '괴롭힘 또는 폭력',
    '유해하거나 위험한 행위',
    '사적 이익 또는 홍보를 위한 콘텐츠',
    '잘못된 정보',
  ]

  const [selected, setSelected] = useState<string | null>(null)
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="flex flex-col gap-[10px] w-[400px] max-h-[80vh] bg-white rounded-[10px] p-[20px] overflow-y-auto">
          <div className="flex w-full justify-between">
            <div className="flex gap-[10px] items-center">
              <Siren size={30} />
              <span className="text-[25px] font-bold">신고</span>
            </div>
            <X size={24} onClick={onClose} />
          </div>
          <span className="text-[18px] font-semibold ">어떤 문제인가요?</span>
          <p className="text-[14px]">
            MAPICK에서 모든 커뮤니티 가이드에 대해 확인하므로 완벽히 들어맞지
            않아도 괜찮습니다.
          </p>

          <div className="flex flex-col gap-[15px] mt-[10px]">
            {reportReasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-[5px] cursor-pointer"
              >
                <input
                  type="radio"
                  name="report"
                  value={reason}
                  checked={selected === reason}
                  onChange={() => setSelected(reason)}
                />
                <span>{reason}</span>
              </label>
            ))}
            <Button
              onClick={() => {
                onClose()
                toast.success('신고가 접수되었습니다.')
              }}
            >
              신고
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
