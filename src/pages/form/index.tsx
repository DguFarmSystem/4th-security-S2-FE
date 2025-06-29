import { useState, useEffect } from 'react';
import IconBack from '@/assets/icons/IconBack.svg';
import QuestionInput from "@/components/form/QuestionInput";
import { twMerge } from 'tailwind-merge';

const dummyMeta = {
  title: "웹사이트 개발자 찾아요.",
  date: "2025-05-17T12:00:00Z",
  tags: ["유료 작업", "개발"],
};

const dummyQuestions = [
  { id: "q1", question: "이름", isRequired: true },
  { id: "q2", question: "연락처", isRequired: true },
  { id: "q3", question: "어떤 기술 스택을 원하나요?", isRequired: false },
  { id: "q4", question: "예상 작업 기간은?", isRequired: false },
  { id: "q5", question: "예산 범위를 알려주세요.", isRequired: true },
] as const;

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

interface Meta {
  title: string;
  date: string;
  tags: string[];
}

export default function FormPage() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [questions, setQuestions] = useState<typeof dummyQuestions | []>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setMeta(dummyMeta);
    setQuestions(dummyQuestions);
    setAnswers(
      dummyQuestions.reduce((acc, q) => {
        acc[q.id] = "";
        return acc;
      }, {} as Record<string, string>)
    );
  }, []);

  const handleChange = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstEmptyRequired = questions.find(
      (q) => q.isRequired && !answers[q.id].trim()
    );

    if (firstEmptyRequired) {
      alert(`"${firstEmptyRequired.question}" 항목을 입력해주세요.`);
      document
        .getElementById(firstEmptyRequired.id)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    console.table(answers);
    alert("제출 완료!");
  };

  if (!meta) return null;

  return (
    <div className="w-full h-full">
      <form
        id="answerForm"
        className="flex flex-col justify-between w-full h-full"
        onSubmit={handleSubmit}
      >
        {/* 헤더 & 메타 */}
        <div className="flex flex-col mt-[17px] gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center w-8 h-8 mx-[27px]"
          >
            <img src={IconBack} alt="뒤로가기" />
          </button>

          <h2 className="text-xl font-bold text-[#F5179A] mx-[31px]">
            {meta.title}
          </h2>

          {/* 태그 & 날짜 */}
          <div className="flex gap-1 mx-[31px] items-center">
            {meta.tags.map((tag, i) => (
              <div
                key={tag}
                className={twMerge(
                  "rounded-[3px] flex w-9 h-[13px] justify-center items-center",
                  i === 0 ? "bg-[#B281F4]" : "bg-[#53BDF5]"
                )}
              >
                <p className="text-[8px]">{tag}</p>
              </div>
            ))}
            <p className="text-[8px] ml-1 w-9">{formatDate(meta.date)}</p>
          </div>
        </div>

        {/* 질문 리스트 */}
        <section className="flex-1 overflow-y-auto px-[31px] py-4 space-y-4">
          {questions.map((q, idx) => (
            <QuestionInput
              key={q.id}
              id={q.id}
              label={`Q. ${q.question}`}
              isRequired={q.isRequired}
              value={answers[q.id] ?? ""}
              onChange={handleChange}
              autoFocus={idx === 0}
            />
          ))}
        </section>



        {/* 하단 */}
        <div className='w-full flex flex-col items-center'>
          <p className='text-[#666666] text-xs mt-6 mb-[18px] mx-8'>
            ※ 이름과 연락처는 요청자가 지원을 수락하기 전까지는 공개되지 않습니다.
          </p>
          <button
            type="submit"
            className="w-full pt-[14px] pb-[15px] flex items-center justify-center bg-[#F5179A]"
          >
            <p className="text-white text-base">작성 완료</p>
          </button>
        </div>
      </form>
    </div>
  );
}