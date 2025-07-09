import Mypage from '@/components/mypage/Mypage';
import Mypageimg from '@/components/mypage/Mypageimg';
import Mypagelabel from '@/components/mypage/Mypagelabel';

export default async function page() {
  return (
    <>
      <Mypageimg />
      <Mypagelabel />
      <Mypage />
    </>
  );
}
