import Mypage from '@/components/mypage/Mypage';
import MypageImg from '@/components/mypage/MypageImg';
import Mypagelabel from '@/components/mypage/MypageLabel';

export const metadata = {
  title: '마이페이지',
};

export default async function page() {
  return (
    <>
      <MypageImg />
      <Mypagelabel />
      <Mypage />
    </>
  );
}
