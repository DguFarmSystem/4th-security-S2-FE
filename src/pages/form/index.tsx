export default function FormPage() {
  return (
    <div className="w-full h-full">
      <form className='flex flex-col justify-between w-full h-full'>
        <div className="flex">
          <h2 className="text-xl font-bold text-[#F5179A]">
            웹사이트 개발자 찾아요.
          </h2>
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
