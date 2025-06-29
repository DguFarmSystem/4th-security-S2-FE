import type { QuestionType } from "@/pages/edit";
import QuestionBoxInput from "@/components/edit/QuestionBoxInput";
import IconXMark from "@/assets/icons/IconXMark.svg";
import IconPlust from "@/assets/icons/IconPlus.svg";

interface IQuestionBoxProps {
  questions: QuestionType[];
  setQuestions: (questions: QuestionType[]) => void;
}

export default function QuestionBox({
  questions,
  setQuestions,
}: IQuestionBoxProps) {
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
      <AddQuestion
        questions={questions}
        setQuestions={setQuestions}
      />
    </div>
  );
}

function AddQuestion({
  questions,
  setQuestions,
}: {
  questions: QuestionType[];
  setQuestions: (questions: QuestionType[]) => void;  
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setQuestions([
          ...questions,
          { text: "", isRequired: false },
        ]);
      }}
      className="flex w-full justify-center items-center bg-[#4A4A4A] rounded-[5px] mb-[6px] h-[28px]"
    >
      <img src={IconPlust} alt="Add" className="w-[15px] h-[15px] mr-[4px]" />
      <p className="text-[10px] text-[#BCBCBD]">
        항목 추가
      </p>
    </button>
  );
};