import Button from '../ui/Button';
import Input from '../ui/Input';

export default function CommentForm() {
  return (
    <form className="flex gap-3.5 items-center mt-4">
      <Input
        type="text"
        placeholder="댓글을 입력해주세요"
        className="h-[44px]"
      />
      <Button
        type="submit"
        buttonStyle="green"
        className="px-6 py-2.5 text-base font-medium whitespace-nowrap cursor-pointer"
      >
        등록
      </Button>
    </form>
  );
}
