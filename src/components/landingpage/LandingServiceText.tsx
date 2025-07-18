import Button from '../ui/Button';

export default function LandingServiceText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-box w-1/2 flex flex-col justify-center items-center">
      <div className="max-w-[440px]">
        <h2 className="text-[28px] font-bold text-[var(--black)] mb-[30px]">
          {title}
        </h2>
        <p className="text-[20px] leading-[1.8] mb-[30px] whitespace-pre-line">
          {description}
        </p>
        <Button
          buttonStyle="smGreen"
          className="w-[170px] h-[50px] rounded-[20px]"
        >
          Get Start
        </Button>
      </div>
    </div>
  );
}
