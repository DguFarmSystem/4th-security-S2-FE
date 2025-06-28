import IconLock from "@/assets/icons/IconLock.svg";

export default function QuestionBoxInput({
  text,
  setText,
  isRequired = false,
}: {
  text: string;
  setText: (text: string) => void;
  isRequired: boolean;
}) {
  const highlightRequiredText = (text: string) => {
    const baseText = text.replace("(필수 항목)", "").trim();
    return (
      <>
        {baseText}
        <span className="ml-1 text-[#F5179A]">(필수 항목)</span>
      </>
    );
  };
  return (
    <div className="flex w-full justify-between items-center bg-[#4A4A4A] rounded-[5px] px-[9px] mb-[6px] h-[38px]">
      {isRequired ? (
        <div className="w-full px-[10px] text-[10px] text-[#BCBCBD] flex items-center">
          {highlightRequiredText(text)}
        </div>
      ) : (
        <input
          type="text"
          placeholder="항목 입력"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full px-[10px] text-[10px] placeholder:text-[#B3B3B3] text-[#BCBCBD] bg-transparent"
        />
      )}
      {isRequired && (
        <img src={IconLock} alt="Lock" className="cursor-pointer w-[13px] h-[13px] ml-[6px]" />
      )}
    </div>
  );
}