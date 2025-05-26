import { PropsWithChildren } from 'react';

export default function WelcomePageLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full bg-primary flex flex-col justify-center items-center px-6 pb-16 pt-32">
      {children}
    </div>
  );
}
