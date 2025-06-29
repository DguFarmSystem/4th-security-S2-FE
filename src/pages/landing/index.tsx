import IconMenuHeart from '@/assets/icons/IconMenuHeart.svg?react';
import IconMenuPen from '@/assets/icons/IconMenuPen.svg?react';
import IconMenuHome from '@/assets/icons/IconMenuHome.svg?react';
import IconMenuGroupAuth from '@/assets/icons/IconMenuGroupAuth.svg?react';
import IconMenuProfile from '@/assets/icons/IconMenuProfile.svg?react';
import LandingPageLayout from '@/components/landing/LandingPageLayout';
import { useTab } from '@/hooks/useTab';
import { motion } from 'framer-motion';
import TabAll from '@/components/landing/tabs/TabAll';
import TabTalentDonation from '@/components/landing/tabs/TabTalentDonation';
import TabPaidWork from '@/components/landing/tabs/TabPaidWork';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';

const TabKey = {
  TAB_ALL: 'TAB_ALL',
  TAB_TALENT_DONATION: 'TAB_TALENT_DONATION',
  TAB_PAID_WORK: 'TAB_PAID_WORK',
} as const;

export default function LandingPage() {
  const navigate = useNavigate();
  const { TabsList, TabTrigger, TabsContainer, TabContent } = useTab<
    keyof typeof TabKey
  >(TabKey.TAB_ALL);

  const TITLE_DURATION_SECOND = 0.5;
  const TITLE_DELAY_SECOND = 0.5;

  const titleProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: TITLE_DURATION_SECOND, delay: TITLE_DELAY_SECOND },
  };

  return (
    <LandingPageLayout>
      <motion.h1
        {...titleProps}
        className="text-4xl font-bold text-primary mx-6 mb-8"
      >
        재능 나눔글
        <br /> 모아보기
      </motion.h1>
      <TabsList>
        <TabTrigger value={TabKey.TAB_ALL}>전체</TabTrigger>
        <TabTrigger value={TabKey.TAB_TALENT_DONATION}>재능 기부</TabTrigger>
        <TabTrigger value={TabKey.TAB_PAID_WORK}>유료 작업</TabTrigger>
      </TabsList>
      <TabsContainer>
        <TabContent value={TabKey.TAB_ALL}>
          <TabAll />
        </TabContent>
        <TabContent value={TabKey.TAB_TALENT_DONATION}>
          <TabTalentDonation />
        </TabContent>
        <TabContent value={TabKey.TAB_PAID_WORK}>
          <TabPaidWork />
        </TabContent>
      </TabsContainer>
      <BottomMenu />
    </LandingPageLayout>
  );

  function BottomMenu() {
    const BOTTOM_MENU = [
      {
        Icon: IconMenuHeart,
        label: '찜한 글',
        onClickPath: PATH.ROOT,
      },
      {
        Icon: IconMenuPen,
        label: '글 작성',
        onClickPath: PATH.ROOT,
      },
      {
        Icon: IconMenuHome,
        label: '홈',
        onClickPath: PATH.ROOT,
      },
      {
        Icon: IconMenuGroupAuth,
        label: '그룹 인증',
        onClickPath: PATH.ROOT,
      },
      {
        Icon: IconMenuProfile,
        label: 'MY',
        onClickPath: PATH.ROOT,
      },
    ];
    return (
      <>
        <div className="flex justify-around sticky bottom-0 py-2">
          {BOTTOM_MENU.map((menu) => (
            <div
              key={menu.label}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(menu.onClickPath)}
            >
              <menu.Icon className="size-6" />
              <span className="text-sm">{menu.label}</span>
            </div>
          ))}
        </div>
      </>
    );
  }
}
