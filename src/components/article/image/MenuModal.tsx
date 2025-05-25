import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import EditIcon from "@/assets/icons/EditIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";

interface IMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { top: number; left: number };
};

export default function MenuModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  position
}: IMenuModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="absolute z-50 w-[124px] bg-[#42454A] rounded-md shadow-lg border border-gray-600"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <ul className="py-2 space-y-2">
        <li>
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="w-full flex items-center justify-between px-[14px]"
          >
            <p className="text-xs text-white">수정</p>
            <img src={EditIcon} alt="수정 아이콘" className="w-[15px] h-[15px]" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="w-full flex items-center justify-between px-[14px]"
          >
            <p className="text-xs text-white">삭제</p>
            <img src={TrashIcon} alt="삭제 아이콘" className="w-[15px] h-[15px]" />
          </button>
        </li>
      </ul>
    </div>,
    document.body
  );
}
