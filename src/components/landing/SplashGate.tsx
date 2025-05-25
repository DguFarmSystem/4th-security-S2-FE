import { useEffect, useState } from 'react';
import IconMainLogo from '@/assets/icons/IconMainLogo.svg?react';
import { getCookie, setCookie } from '@/utils/cookie';
import { AnimatePresence, motion } from 'framer-motion';

const SPLASH_COOKIE_NAME = 'sot-splash-visited';
const SPLASH_COOKIE_DURATION_DAYS = 7;
const SPLASH_DURATION_MS = 2000;

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(
    () => !getCookie(SPLASH_COOKIE_NAME)
  );

  useEffect(() => {
    if (!showSplash) return;

    const timerId = setTimeout(() => {
      setShowSplash(false);
      setCookie(SPLASH_COOKIE_NAME, 'true', SPLASH_COOKIE_DURATION_DAYS);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timerId);
  }, [showSplash]);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? <SplashScreen key="splashScreen" /> : <>{children}</>}
    </AnimatePresence>
  );
}

function SplashScreen() {
  const DURATION_SECOND = 0.5;
  const SPLASH_CONTENT_DELAY_SECOND = 0.3;
  const SPLASH_TEXT_DELAY_SECOND = 1;

  const splashWrapperProps = {
    initial: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION_SECOND, ease: 'easeInOut' },
  };

  const splashContentProps = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      duration: DURATION_SECOND,
      ease: 'easeOut',
      delay: SPLASH_CONTENT_DELAY_SECOND,
    },
  };

  const splashTextProps = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      delay: SPLASH_TEXT_DELAY_SECOND,
      duration: DURATION_SECOND,
      ease: 'easeOut',
    },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-primary"
      {...splashWrapperProps}
    >
      <motion.div {...splashContentProps}>
        <IconMainLogo className="size-96 -mt-44" />
      </motion.div>
      <motion.h3 className="text-2xl font-bold -mt-16" {...splashTextProps}>
        Share Our Talents!
      </motion.h3>
    </motion.div>
  );
}
