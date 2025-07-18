import Image from 'next/image';
import LandingServiceText from './LandingServiceText';

type LandingServiceWrapProps = {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  zIndex: number;
};

export default function LandingServiceWrap({
  title,
  description,
  image,
  reverse = false,
  zIndex,
}: LandingServiceWrapProps) {
  return (
    <section
      className={`panel absolute top-0 left-0 w-full h-screen flex overflow-hidden z-[${zIndex}]`}
    >
      {reverse ? (
        <>
          <div className="w-1/2 h-full image-box relative shrink-0">
            <Image
              src={image}
              alt="배너"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            {/* 커버 span 요소 */}
            {/* <div className="cover-box left">
              <span className="cover-top"></span>
              <span className="cover-right"></span>
              <span className="cover-bottom"></span>
              <span className="cover-left"></span>
            </div> */}
          </div>
          <div className="text-box w-1/2 flex items-center justify-center">
            <LandingServiceText title={title} description={description} />
          </div>
        </>
      ) : (
        <>
          <div className="text-box w-1/2 flex items-center justify-center">
            <LandingServiceText title={title} description={description} />
          </div>
          <div className="w-1/2 h-full relative image-box shrink-0">
            <Image
              src={image}
              alt="배너"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            {/* 커버 span 요소 */}
            {/* <div className="cover-box right">
              <span className="cover-top"></span>
              <span className="cover-right"></span>
              <span className="cover-bottom"></span>
              <span className="cover-left"></span>
            </div> */}
          </div>
        </>
      )}
    </section>
  );
}
