import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import EditPageHeader from '@/components/edit/EditPageHeader';
import EditPageFooter from '@/components/edit/EditPageFooter';
import ImageUploader from '@/components/edit/ImageUploader';

export default function EditPage() {
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');
    images.forEach((img, idx) => formData.append(`images[${idx}]`, img));
    console.log([...formData.entries()]);

    console.log('제목:', title);
    console.log('내용:', content);

    navigate(-1);
  };
  return (
    <div className="text-white flex flex-col items-start w-full h-full">
      {/* 글쓰기 페이지 헤더 */}
      <EditPageHeader onBackClick={handleBackClick} />
      <form onSubmit={handleSubmit} className='flex flex-col justify-between w-full h-full'>
        <div className="flex flex-col items-start w-full px-[25px] pt-3">
          {/* 글쓰기 페이지 제목 */}
          <input
            name="title"
            autoFocus
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
            name="content"
            autoFocus
            placeholder={
              "필요한 작업을 요청해보세요.\n\n" + 
              "동국대 재학생에게 재능을 요청할 수 있는 공간입니다.\n" + 
              "목적, 기간, 방식 등을 구체적으로 작성하면 더 정확하게 연결돼요."
            }
            className={twMerge(
              "text-white text-xs font-normal w-full min-h-[154px] mt-3 whitespace-pre-line",
              "flex items-start justify-start focus:outline-none",
              "placeholder:text-[#666] placeholder:font-normal pt-2 resize-none"
            )}
          ></textarea>
          <ImageUploader images={images} setImages={setImages} />
        </div>
        {/* 
          * 글쓰기 페이지 푸터
          * 폼 type="submit" 버튼은 푸터 컴포넌트 안에 넣어놈.
        */}
        <div className='w-full'>
          <EditPageFooter
            onImageUpload={() => (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.click()}
            onQuestionAdd={() => console.log('질문 추가')}
          />
        </div>
      </form>

    </div>
  );
}