import Lottie from 'react-lottie-player';
import animationData from '../../../public/assets/landingBanner.json';

export default function LandingBanner() {
  return (
    <section className="w-full h-screen max-h-[1100px] flex items-center">
      <div className="w-[950px] m-auto">
        <Lottie
          loop
          play
          animationData={animationData}
          style={{ width: '100%', height: 'auto' }}
        ></Lottie>
      </div>
    </section>
  );
}
