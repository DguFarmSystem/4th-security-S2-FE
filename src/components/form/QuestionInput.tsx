import { useRef, useEffect } from "react";

interface QuestionInputProps {
  id: string;
  label: string;
  isRequired: boolean;
  value: string;
  onChange: (id: string, v: string) => void;
  autoFocus?: boolean;
}

export default function QuestionInput({
  id,
  label,
  isRequired,
  value,
  onChange,
  autoFocus,
}: QuestionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    if (autoFocus) el.focus();
    resizeTextarea();
  }, [autoFocus]);

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <label className="flex flex-col gap-1 w-full">
      <p className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-[#F5179A] ml-1">*</span>}
      </p>
      <textarea
        ref={textareaRef}
        placeholder="자유롭게 답변해주세요"
        className="border rounded-md px-3 py-2 text-xs outline-none bg-white text-black placeholder:text-[#BCBCBD] resize-none overflow-hidden"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        rows={1}
      />
    </label>
  );
}