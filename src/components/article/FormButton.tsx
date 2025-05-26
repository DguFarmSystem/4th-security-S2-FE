import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import FormCheckIcon from "./FormCheckIcon";

type formStatusType = "신청하기" | "임시저장" | "신청완료";
interface IFormButtonProps {
  formStatus: formStatusType;
  handleFormButtonClick: () => void;
}

const themeClassMap = {
  신청하기: {
    border: "border-[#F5179A] shadow-[0_0_5px_0_#F5179A]",
    text: "text-[#F5179A]",
    icon: "#F5179A",
  },
  임시저장: {
    border: "border-[#B281F4] shadow-[0_0_5px_0_#B281F4]",
    text: "text-[#B281F4]",
    icon: "#B281F4",
  },
  신청완료: {
    border: "border-[#666666] shadow-[0_0_5px_0_#666666]",
    text: "text-[#666666]",
    icon: "#666666",
  },
};

export default function FormButton({
  formStatus,
  handleFormButtonClick,
}: IFormButtonProps) {
  const [buttonText, setButtonText] = useState<"" | formStatusType>("");
  const { border, text, icon } = themeClassMap[formStatus];
  
   useEffect(() => {
    setButtonText(formStatus);
  }, [formStatus]);

  return (
    <button
      className={twMerge(
        "w-full flex-shrink-0 rounded-[5px] border-[0.3px]", 
        "flex justify-start items-center px-[10px] py-2 gap-[5px]", 
        border,
      )}
      onClick={handleFormButtonClick}
    >
      <div className="w-5 h-5">
        <FormCheckIcon color={icon} />
      </div>
      <p className={twMerge('text-[12px]', text)}>
        {buttonText}
      </p>
    </button>
  );
}