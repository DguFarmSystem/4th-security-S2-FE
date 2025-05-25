import { PropsWithChildren } from 'react';

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col h-full pt-16">{children}</div>;
}
