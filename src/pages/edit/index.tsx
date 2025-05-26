import IconLeftArrow from '@/assets/icons/IconLeftArrow.svg';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';

export default function EditPage() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="text-white flex flex-col items-start w-full">
      {/* 글쓰기 페이지 헤더 */}
      <div className="flex justify-between items-center w-full px-[27px] pt-[18px] pb-2">
        <button 
          onClick={handleBackClick}
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
      <div className="flex flex-col items-start w-full px-[25px] pt-3">
        {/* 글쓰기 페이지 제목 */}
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className={twMerge(
            "text-white text-base font-bold w-full min-h-[41px]", 
            "flex items-center justify-start focus:outline-none",
            "placeholder:text-[#666] placeholder:font-bold placeholder:text-base",
            "border-b-[0.1px] border-[#505967]"
          )}
        />
        <textarea
          placeholder={
            "필요한 작업을 요청해보세요.\n\n" + 
            "동국대 재학생에게 재능을 요청할 수 있는 공간입니다.\n" + 
            "목적, 기간, 방식 등을 구체적으로 작성하면 더 정확하게 연결돼요."
          }
          className={twMerge(
            "text-white text-base font-normal w-full min-h-[154px] mt-3 whitespace-pre-line",
            "flex items-start justify-start focus:outline-none",
            "placeholder:text-[#666] placeholder:font-normal placeholder:text-base pt-2"
          )}
        ></textarea>
      </div>
    </div>
  );
}