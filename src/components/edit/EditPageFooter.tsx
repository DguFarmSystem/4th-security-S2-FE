import { useState } from 'react';
import BottomSheet from '@/components/common/modal/BottomSheet';
import IconGallery from "@/assets/icons/IconGallery.svg";
import IconFormEdit from "@/assets/icons/IconFormEdit.svg";

interface IEditPageFooterProps {
  onImageUpload: () => void;
  onQuestionAdd: () => void;
  onTaskSubmit?: (data: { type: 'free' | 'paid'; field: string }) => void;
}

export default function EditPageFooter({
  onImageUpload,
  onQuestionAdd,
  onTaskSubmit,
}: IEditPageFooterProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'free' | 'paid'>('paid');
  const [field, setField] = useState('');

  // API 호출 흐름 확인 후 수정하겠습니다!
  const handleSheetSubmit = () => {
    onTaskSubmit?.({ type, field });
    setOpen(false);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-start items-center px-[25px] py-[14px] border-t-[0.1px] border-[#505967] gap-4 ">
        <button
          type="button"
          aria-label="이미지 업로드"
          onClick={onImageUpload}
          className="flex items-center justify-center"
        >
          <img
            src={IconGallery}
            alt="이미지 업로드"
            className="w-6 h-6"
          />
        </button>
        <button
          type="button"
          aria-label="질문 추가"
          onClick={onQuestionAdd}
          className="ml-3 flex items-center justify-center"
        >
          <img
            src={IconFormEdit}
            alt="질문 추가"
            className="w-6 h-6"
          />
        </button>
      </div>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true)
        }}
        className="w-full pt-[14px] pb-[15px] flex items-center justify-center bg-[#F5179A]"
      >
        <p className="text-white text-base">작성 완료</p>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <div className="p-6 space-y-4 min-h-[140px] flex flex-col">
           <div className="grid grid-cols-[72px_1fr] gap-x-4 gap-y-4">
            {/* ─ 작업 성격 ─ */}
            <label className="text-xs font-bold flex items-center">작업 성격</label>
            <fieldset className="flex items-center gap-4">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="type"
                  value="free"
                  checked={type === 'free'}
                  onChange={() => setType('free')}
                  className="accent-[#F5179A]"
                />
                재능기부
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="type"
                  value="paid"
                  checked={type === 'paid'}
                  onChange={() => setType('paid')}
                  className="accent-[#F5179A]"
                />
                유료 작업
              </label>
            </fieldset>

            {/* ─ 작업 분야 ─ */}
            <label className="text-xs font-bold flex items-center">작업 분야</label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="어떤 분야의 작업인지 적어주세요."
              className="w-full rounded-md bg-[#444] px-3 py-2 text-xs placeholder-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={handleSheetSubmit}
              className="w-15 h-5 rounded-md bg-[#F5179A] text-white text-[10px]"
            >
              작성 완료
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}