import { useState } from "react";
import QuestionBoxInput from "@/components/edit/QuestionBoxInput";
import IconXMark from "@/assets/icons/IconXMark.svg";

type QuestionType = {
  text: string;
  isRequired: boolean;
};

export default function QuestionBox() {
  const [questions, setQuestions] = useState<QuestionType[]>([
    { text: "이름", isRequired: true },
    { text: "연락처", isRequired: true },
  ]);

  return (
    <div className="flex flex-col w-full rounded-[5px] bg-[#373737] px-[10px] pt-0 pb-4">
      <div className="flex items-center justify-between w-full h-[38px] p-[10px]">
        <h3 className="text-xs font-bold">질문 항목</h3>
        <img src={IconXMark} alt="Close" className="cursor-pointer" />
      </div>
      {questions.map((question, index) => (
        <QuestionBoxInput
          key={index}
          text={question.text}
          setText={(text: string) => {
            const newQuestions = [...questions];
            newQuestions[index] = { ...newQuestions[index], text };
            setQuestions(newQuestions);
          }}
          isRequired={question.isRequired}
        />
      ))}
    </div>
  );
}
