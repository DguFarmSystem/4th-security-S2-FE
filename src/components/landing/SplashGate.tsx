import { useEffect, useState } from 'react';
import IconMainLogo from '@/assets/icons/IconMainLogo.svg?react';
import { getCookie, setCookie } from '@/utils/cookie';

const SPLASH_COOKIE_NAME = 'sot-splash-visited';
const SPLASH_COOKIE_DURATION_DAYS = 7;
const SPLASH_DURATION_MS = 3000;

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

  return showSplash ? <SplashScreen /> : <>{children}</>;
}

function SplashScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <IconMainLogo className="size-96" />
      <h3 className="text-2xl font-bold">Share Our Talents!</h3>
    </div>
  );
}
