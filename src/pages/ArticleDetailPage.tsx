import { useState, useEffect } from "react";
import PortfoiloImage from "@/assets/images/PortfolioImage.webp";
import ImageCarousel from "@/components/article/image/ImageCarousel";
import FormButton from "@/components/article/FormButton";
import HeartContainer from "@/components/article/HeartContainer";
import CommentContainer from "@/components/article/comment/CommentContainer";

const dummyData = {
  title: "웹사이트 개발자 찾아요.",
  author: "아코",
  profile: null,
  temperture: 34,
  date: "2025-05-17",
  tags: ["유료 작업", "개발"],
  content: "간단한 포트폴리오 웹사이트를 함께 제작해주실 분을 찾고 있어요! 디자인은 어느 정도 되어 있고, 프론트엔드로 구현만 도와주시면 됩니다.",
  likeCount: 10,
  isLikeClicked: false,
  comments: [
    {
      id: 1,
      profile: null,
      author: "꾸기",
      date: "2025-05-25T12:00:00Z",
      content: "리액트 기반 프로젝트 경험이 많습니다 :)\n디자이너 분들과 협업도 여러 번 해봤고,\n제안해주신 내용 충분히 가능할 것 같아요.\n함께 좋은 결과 만들어보고 싶습니다!"
    }
  ]
};

function parseData(data: string) {
  // yyyy-mm-dd를 mm.dd
  const date = new Date(data);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
}

export default function ArticleDetailPage() {
  const [data, setData] = useState<typeof dummyData | null>(null);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [heartCount, setHeartCount] = useState(dummyData.likeCount);  

  useEffect(() => {
    setData(dummyData);
  }, []);

  if (!data) return null;

  return (
    <div className="text-white flex flex-col items-start">
      <ImageCarousel images={[PortfoiloImage, PortfoiloImage, PortfoiloImage]} />

      <div className="flex flex-col w-full px-[21px] items-start">
        {/* 프로필 */}
        <div className="flex w-full justify-start items-center py-3 gap-3">
          <div className="bg-[#E8EBED] w-9 h-9 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
            {data.profile && (
              <img
                src={data.profile}
                alt="프로필 이미지"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <h2 className="text-[14px] font-bold">{data.author}</h2>
            <p className="text-[9px] text-[#B0B3B8]">{data.temperture}℃</p>
          </div>
        </div>

        {/* 제목, 태그 */}
        <div className="py-2 flex flex-col gap-2 w-full">
          <h1 className="text-lg font-bold">{data.title}</h1>
          <div className="flex gap-1">
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
        
        {/* 내용 */}
        <div className="w-full flex flex-col items-center justify-between pb-3.5">
          <p className="text-xs leading-5 w-full min-h-[68px] pt-4">{data.content}</p>

          <FormButton
            formStatus="신청하기"
            handleFormButtonClick={() => {
              console.log("신청하기 버튼 클릭");
            }}
          />
        </div>

        <HeartContainer
          isHeartClicked={isHeartClicked}
          setIsHeartClicked={setIsHeartClicked}
          heartCount={heartCount}
          setHeartCount={setHeartCount}
        />
      </div>
      
      {/* 댓글 */}
      <CommentContainer commentData={data.comments} />
      
    </div>
  );
}
