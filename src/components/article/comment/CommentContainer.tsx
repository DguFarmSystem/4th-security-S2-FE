import Comment, { CommentData } from "./Comment";

interface ICommentContainerProps {
  commentData: CommentData[];
}

export default function CommentContainer({
  commentData,
}: ICommentContainerProps) {
  return (
    <>
      {/* 댓글 */}
      <div 
        className="w-full mt-[19px] mb-[13px]"
        style={{ borderBottom: "0.1px solid #505967" }}
      />
      <div className="flex flex-col w-full px-[21px] items-start">
        <h3 className="h-[30px] text-sm font-bold text-white flex items-center justify-start">
          <p>{commentData.length}개의 댓글</p>
        </h3>
        <div className="flex flex-col gap-3 w-full">
          {commentData.map((comment) => (
            <Comment
              key={comment.id}
              commentData={comment}
            />
          ))}
        </div>
      </div>
    </>
  );
};