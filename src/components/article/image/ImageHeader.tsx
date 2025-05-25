import { useNavigate } from "react-router-dom";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import GoBackIcon from "@/assets/icons/GoBackIcon.svg";

export default function ImageHeader() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="absolute top-[20px] left-[22px] z-10">
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={handleGoBack}
          className="flex items-center justify-center cursor-pointer"
        >
          <img
            src={GoBackIcon}
            alt="뒤로가기 아이콘"
            className="w-[17px] h-[25px]"
          />
        </button>
        <button 
          onClick={handleGoHome}
          className="flex items-center justify-center cursor-pointer"
        >
          <img
            src={HomeIcon}
            alt="홈 아이콘"
            className="w-[16px] h-[25px] mt-1.5"
          />
        </button>
      </div>
    </div>
  );
};