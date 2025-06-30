import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuModal from "./MenuModal";
import IconHome from "@/assets/icons/IconHome.svg";
import IconGoBack from "@/assets/icons/IconGoBack.svg";
import IconDotMenu from "@/assets/icons/IconDotMenu.svg";

interface IImageHeaderProps {
  isEditable: boolean;
}

export default function ImageHeader({ isEditable = false }: IImageHeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleGoBackClick = () => navigate(-1);
  const handleGoHomeClick = () => navigate("/");

  const handleMenuClick = () => {
    if (!isMenuOpen && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 9,
        left: rect.left + window.scrollX - 124 + 14,
      });
    }
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="absolute top-[20px] left-0 px-[22px] z-10 flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center gap-4">
        <button onClick={handleGoBackClick} className="flex items-center justify-center cursor-pointer">
          <img src={IconGoBack} alt="뒤로가기 아이콘" className="w-[17px] h-[25px]" />
        </button>
        <button onClick={handleGoHomeClick} className="flex items-center justify-center cursor-pointer">
          <img src={IconHome} alt="홈 아이콘" className="w-[16px] h-[25px] mt-1.5" />
        </button>
      </div>
      {isEditable && (
        <button
          ref={menuButtonRef}
          onClick={handleMenuClick}
          className="flex items-center justify-center cursor-pointer"
          id="menu-button"
        >
          <img src={IconDotMenu} alt="메뉴 아이콘" className="w-[19px] h-[25px]" />
        </button>
      )}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onEdit={() => navigate(`/edit`)}
        onDelete={() => console.log("Delete clicked")}
        position={menuPosition}
      />
    </div>
  );
}
