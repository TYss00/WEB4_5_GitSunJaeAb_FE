'use client';

import Lottie from 'lottie-react';
import animationData from '@/../public/animations/MaPickLoding.json';

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-[100px] h-[100px] flex items-center justify-center">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
