import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import IconMainLogo from '@/assets/icons/IconMainLogo.svg?react';
import { useAuthStore } from '@/stores/authStore';
import Button from '../common/button/Button';
import IconKakaoLogin from '@/assets/icons/IconKakaoLogin.svg?react';
import IconRightChevron from '@/assets/icons/IconRightChevron.svg?react';
import { motion } from 'framer-motion';
import { OauthProvider } from '@/types/oauth/oauthType';
import WelcomePageLayout from './WelcomePageLayout';
import { useOauth } from '@/hooks/useOauth';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { setIsGuest } = useAuthStore();
  const { handleOauth } = useOauth();

  const DURATION_SECOND = 0.5;
  const LOGO_DELAY_SECOND = 0.5;
  const TITLE_DELAY_SECOND = 0.8;
  const BUTTON_DELAY_SECOND = 1.2;

  const logoProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION_SECOND, delay: LOGO_DELAY_SECOND },
  };

  const titleProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION_SECOND,
      delay: TITLE_DELAY_SECOND,
      type: 'spring',
      stiffness: 100,
    },
  };

  const buttonProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION_SECOND, delay: BUTTON_DELAY_SECOND },
  };

  return (
    <WelcomePageLayout>
      <motion.div {...logoProps}>
        <IconMainLogo />
      </motion.div>
      <motion.h3 {...titleProps} className="-mt-5 text-lg">
        우리들의 재능이 이어지는 공간
      </motion.h3>
      <motion.div {...buttonProps} className="w-full mt-auto">
        <Button
          className="w-full bg-[#fee500] mb-3 hover:bg-[#fee500]/90"
          onClick={() => handleOauth(OauthProvider.KAKAO)}
        >
          <IconKakaoLogin className="ml-3" />
          <span className="flex-1 text-black">카카오로 로그인</span>
        </Button>
        <Button
          className="w-full bg-black hover:bg-black/90"
          onClick={() => {
            setIsGuest(true);
            navigate(PATH.ROOT);
          }}
        >
          <IconRightChevron className="ml-3" />
          <span className="flex-1">로그인 없이 둘러보기</span>
        </Button>
      </motion.div>
    </WelcomePageLayout>
  );
}
