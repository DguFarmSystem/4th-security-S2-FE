import { PropsWithChildren } from 'react';

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {children}
    </div>
  );
}
