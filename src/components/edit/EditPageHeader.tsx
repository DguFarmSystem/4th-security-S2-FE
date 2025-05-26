import IconLeftArrow from "@/assets/icons/IconLeftArrow.svg";

interface IEditPageHeaderProps {
  onBackClick: () => void;
}

export default function EditPageHeader({
  onBackClick
}: IEditPageHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full px-[27px] pt-[18px] pb-2">
      <button 
        onClick={onBackClick}
        className="font-bold w-8 h-8 flex items-center justify-center"
      >
        <img 
          src={IconLeftArrow}
          alt="뒤로가기"
          className="w-[18.88px] h-[17.33333px]"
        />
      </button>
      <h2 className="text-white text-base font-bold flex items-end justify-end">글 쓰기</h2>
      <button className="text-background text-sm font-bold w-8">.</button>
    </div>
  );
};