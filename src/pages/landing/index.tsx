import IconMenuHeart from '@/assets/icons/IconMenuHeart.svg?react';
import IconMenuPen from '@/assets/icons/IconMenuPen.svg?react';
import IconMenuHome from '@/assets/icons/IconMenuHome.svg?react';
import IconMenuGroupAuth from '@/assets/icons/IconMenuGroupAuth.svg?react';
import IconMenuProfile from '@/assets/icons/IconMenuProfile.svg?react';
import LandingPageLayout from '@/components/landing/LandingPageLayout';
import { useTab } from '@/hooks/useTab';
import { motion } from 'framer-motion';
import TabAll from '@/components/landing/TabAll';
import TabTalentDonation from '@/components/landing/TabTalentDonation';
import TabPaidWork from '@/components/landing/TabPaidWork';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/common/modal/Modal';

const TabKey = {
  TAB_ALL: 'TAB_ALL',
  TAB_TALENT_DONATION: 'TAB_TALENT_DONATION',
  TAB_PAID_WORK: 'TAB_PAID_WORK',
} as const;

export default function LandingPage() {
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
    /* 아래 모달의 경우는 1차적으로 디자인 내용 확인을 위해 넣은 모달입니다. (추후 로직에 따라 수정될 예정입니다.) */
    const { isOpen, openModal, closeModal } = useModal();
    const BOTTOM_MENU = [
      {
        Icon: IconMenuHeart,
        label: '찜한 글',
      },
      {
        Icon: IconMenuPen,
        label: '글 작성',
      },
      {
        Icon: IconMenuHome,
        label: '홈',
      },
      {
        Icon: IconMenuGroupAuth,
        label: '그룹 인증',
      },
      {
        Icon: IconMenuProfile,
        label: 'MY',
      },
    ];
    return (
      <>
        <div className="flex justify-around sticky bottom-0 py-2">
          {BOTTOM_MENU.map((menu) => (
            <div
              key={menu.label}
              className="flex flex-col items-center cursor-pointer"
              onClick={openModal}
            >
              <menu.Icon className="size-6" />
              <span className="text-sm">{menu.label}</span>
            </div>
          ))}
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center rounded-xl">
            <h3>아직 열리지 않은 기능이에요.</h3>
            <h3>더 좋은 모습으로 곧 찾아올게요!</h3>
            <button onClick={closeModal} className="mt-5 underline">
              확인
            </button>
          </div>
        </Modal>
      </>
    );
  }
}
