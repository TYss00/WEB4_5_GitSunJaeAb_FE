import LayerEdit from '@/components/ui/layer/LayerEdit'
import Link from 'next/link'

export default async function page() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/login">
          <button>로그인</button>
        </Link>

        <Link href="/categories">
          <button>카테고리</button>
        </Link>

        <Link href="/dashbord/main">
          <button>메인대시보드</button>
        </Link>
      </div>
      <h1>홈화면입니다.</h1>
      <LayerEdit title="레이어1" />

      <LayerEdit title="레이어2" isTextArea />
    </>
  )
}
