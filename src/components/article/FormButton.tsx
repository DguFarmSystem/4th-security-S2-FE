import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import FormCheckIcon from "./FormCheckIcon";

type formStatusType = "신청하기" | "임시저장" | "신청완료";
interface IFormButtonProps {
  formStatus: formStatusType;
  handleFormButtonClick: () => void;
}

export default function FormButton({
  formStatus,
  handleFormButtonClick,
}: IFormButtonProps) {
  const [buttonText, setButtonText] = useState<"" | formStatusType>("");
  
  const themeColorClass =
    formStatus === "신청하기"
      ? "border-[#F5179A] shadow-[0_0_5px_0_#F5179A]"
      : formStatus === "임시저장"
      ? "border-[#B281F4] shadow-[0_0_5px_0_#B281F4]"
      : "border-[#666666] shadow-[0_0_5px_0_#666666]";

  const textColorClass =
    formStatus === "신청하기"
      ? "text-[#F5179A]"
      : formStatus === "임시저장"
      ? "text-[#B281F4]"
      : "text-[#666666]";

  const buttonColor =
    formStatus === "신청하기"
      ? "#F5179A"
      : formStatus === "임시저장"
      ? "#B281F4"
      : "#666666";

   useEffect(() => {
    setButtonText(formStatus);
  }, [formStatus]);

  return (
    <button
      className={twMerge(
        "w-full flex-shrink-0 rounded-[5px] border-[0.3px]", 
        "flex justify-start items-center p-[10px] gap-[5px]", 
        themeColorClass,
      )}
      onClick={handleFormButtonClick}
    >
      <div className="w-5 h-5">
        <FormCheckIcon color={buttonColor} />
      </div>
      <p className={twMerge('text-[12px]', textColorClass)}>
        {buttonText}
      </p>
    </button>
  );
}