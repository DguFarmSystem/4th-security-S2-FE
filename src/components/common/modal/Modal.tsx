import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscKeyClose } from '@/hooks/useEscKeyClose';
import { useScrollLockEffect } from '@/hooks/useScrollLockEffect';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: IModalProps) {
  const MODAL_ANIMATION_DURATION = 0.2;
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose); // 모달 외부 클릭 시 닫기
  useEscKeyClose(onClose); // ESC 키 누르면 닫기
  useScrollLockEffect(isOpen); // 스크롤 잠금 효과

  const modalElement = document.getElementById('modal') as HTMLElement;

  if (!modalElement) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <ModalLayout>
          <Overlay />
          <ModalContent />
        </ModalLayout>
      )}
    </AnimatePresence>,
    modalElement
  );

  function ModalLayout({ children }: { children: React.ReactNode }) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {children}
      </div>
    );
  }

  function Overlay() {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: MODAL_ANIMATION_DURATION },
        }}
        exit={{ opacity: 0 }}
      />
    );
  }

  function ModalContent() {
    return (
      <motion.div
        className="relative z-50 p-6 bg-white rounded-default"
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: MODAL_ANIMATION_DURATION },
        }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {children}
      </motion.div>
    );
  }
}
