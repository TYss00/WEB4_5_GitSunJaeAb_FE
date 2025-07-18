import Lottie from 'react-lottie-player';
import animationData from '../../../public/assets/landingBanner.json';

export default function LandingBanner() {
  return (
    <section className="w-full h-screen pt-[80px] max-h-[1000px]">
      <div className="w-[950px] mx-auto">
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
