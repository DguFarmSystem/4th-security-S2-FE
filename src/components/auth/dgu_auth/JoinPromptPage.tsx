import IconSubLogo from '@/assets/icons/IconSubLogo.svg?react';
import Button from '@/components/common/button/Button';
import { motion } from 'framer-motion';
import DGUAuthLayout from './DGUAuthLayout';

interface JoinPromptPageProps {
  onNext: () => void;
}

export default function JoinPromptPage({ onNext }: JoinPromptPageProps) {
  const DURATION_SECOND = 0.5;
  const TITLE_DELAY_SECOND = 0.2;
  const SUBTITLE_DELAY_SECOND = 0.4;
  const BUTTON_DELAY_SECOND = 0.6;

  const titleProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION_SECOND,
      delay: TITLE_DELAY_SECOND,
      type: 'spring',
      stiffness: 100,
    },
  };

  const subtitleProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION_SECOND, delay: SUBTITLE_DELAY_SECOND },
  };

  const buttonProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION_SECOND, delay: BUTTON_DELAY_SECOND },
  };

  return (
    <DGUAuthLayout>
      <IconSubLogo className="size-36 -ml-9" />
      <motion.h1 {...titleProps} className="text-4xl font-bold text-primary">
        아직 SOT의 회원이
        <br /> 아니시네요.
      </motion.h1>
      <motion.h2 {...subtitleProps} className="text-xl mt-3">
        지금 가입하고 재능을 나눠보세요 :)
      </motion.h2>
      <motion.div {...buttonProps} className="w-full mt-auto">
        <Button onClick={onNext} className="w-full bg-primary">
          지금 시작하기
        </Button>
      </motion.div>
    </DGUAuthLayout>
  );
}
