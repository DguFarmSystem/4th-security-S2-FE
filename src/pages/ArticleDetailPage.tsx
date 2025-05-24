import PortfoiloImage from "@/assets/images/PortfolioImage.webp";

const dummyData = {
  title: "웹사이트 개발자 찾아요.",
  author: "아코",
  profile: null,
  temperture: 34,
  date: "2025-05-17",
  tags: ["유료 작업", "개발"],
  content: "간단한 포트폴리오 웹사이트를 함께 제작해주실 분을 찾고 있어요! 디자인은 어느 정도 되어 있고, 프론트엔드로 구현만 도와주시면 됩니다. ",
  likeCount: 10,
  isLikeClicked: false,
}

export default function ArticleDetailPage() {
  return (
    <div className="text-white flex flex-col items-start">
      {/* 썸네일 */}
      <div className="relative w-full flex-shrink-0 aspect-[385.593/260] flex items-center justify-center overflow-hidden">
        <img
          src={PortfoiloImage}
          alt="포트폴리오 이미지"
          className="w-full object-contain"
        />
        {/* 위쪽 그림자 */}
        <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        {/* 아래쪽 그림자 */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* 메타 데이터 (작성자, 매너온도) */}
      <div className="flex w-full justify-start items-center px-[21px] py-3 gap-3">
        <div className="bg-[#E8EBED] w-9 h-9 rounded-full shrink-0 flex items-center justify-center">
          {dummyData.profile && (
            <img
              src={dummyData.profile}
              alt="프로필 이미지"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[14px] font-bold">{dummyData.author}</h2>
          <p className="text-[9px] text-[#B0B3B8]">{dummyData.temperture}℃</p>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{dummyData.title}</h1>
        <p>{dummyData.content}</p>
      </div>
    </div>
  );
}
