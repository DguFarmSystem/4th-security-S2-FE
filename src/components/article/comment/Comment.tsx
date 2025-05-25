export type CommentData = {
  id: number;
  profile: string | null; // 프로필 이미지 URL 또는 null
  author: string;
  date: string;
  content: string;
};

interface ICommentProps {
  commentData: CommentData;
}

export default function Comment({
  commentData,
}: ICommentProps) {
  return (
    <div>
    {/* 프로필 정보 */}
    <div className="flex w-full justify-start items-center py-3 gap-3">
      <div className="bg-[#E8EBED] w-9 h-9 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
        {commentData.profile && (
          <img
            src={commentData.profile}
            alt="프로필 이미지"
            className="w-full h-full rounded-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-0.5 items-start justify-center">
        <h2 className="text-[14px] font-bold">{commentData.author}</h2>
        <p className="text-[9px] text-[#B0B3B8]">{commentData.date}</p>
      </div>
    </div>
    {/* 댓글 내용 */}
    <p className="text-xs leading-5 w-full min-h-[68px] pl-[48px]">
      {commentData.content}
    </p>
  </div>
  );
}