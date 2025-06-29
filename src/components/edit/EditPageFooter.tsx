import { useState } from 'react';
import BottomSheet from './BottomSheet';
import IconGallery from "@/assets/icons/IconGallery.svg";
import IconFormEdit from "@/assets/icons/IconFormEdit.svg";

interface IEditPageFooterProps {
  onImageUpload: () => void;
  onQuestionAdd: () => void;
}

export default function EditPageFooter({
  onImageUpload,
  onQuestionAdd,
}: IEditPageFooterProps) {
  const [open, setOpen] = useState(false);

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
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-bold">커스텀 바텀시트</h2>
          <button
            onClick={() => setOpen(false)}
            className="w-full rounded-md bg-fuchsia-600 py-2 text-white"
          >
            닫기
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}