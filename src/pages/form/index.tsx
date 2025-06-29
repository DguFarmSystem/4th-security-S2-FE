import { useState, useEffect } from 'react';
import IconBack from '@/assets/icons/IconBack.svg';

const dummyData = {
  title: "웹사이트 개발자 찾아요.",
  date: "2025-05-17T12:00:00Z",
  tags: ["유료 작업", "개발"],
};

function parseData(data: string) {
  // yyyy-mm-dd를 mm.dd
  const date = new Date(data);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
}

export default function FormPage() {
  const [data, setData] = useState<typeof dummyData | null>(null);

  useEffect(() => {
      setData(dummyData);
    }, []);
  
  if (!data) return null;

  return (
    <div className="w-full h-full">
      <form className='flex flex-col justify-between w-full h-full'>
        <div className="flex flex-col mt-[17px] gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center w-8 h-8 mx-[27px]"
          >
            <img
              src={IconBack}
              alt="뒤로가기"
            />
          </button>
          {/* Title */}
          <h2 className="text-xl font-bold text-[#F5179A] mx-[31px]">
            웹사이트 개발자 찾아요.
          </h2>

          {/* Tags & Date */}
          <div className="flex gap-1 mx-[31px]">
            <div className="bg-[#B281F4] rounded-[3px] flex w-9 justify-center items-center">
              <p className="text-[8px]">{data.tags[0]}</p>
            </div>
            <div className="bg-[#53BDF5] rounded-[3px] flex w-9 justify-center items-center">
              <p className="text-[8px]">{data.tags[1]}</p>
            </div>
            <p className="text-[8px] w-9 ">
              {parseData(data.date)}
            </p>
          </div>
          
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="w-full pt-[14px] pb-[15px] flex items-center justify-center bg-[#F5179A]"
        >
          <p className="text-white text-base">작성 완료</p>
        </button>
      </form>
    </div>
  );
}
