import { PropsWithChildren } from 'react';

export default function DGUAuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex flex-col items-start px-6 py-16">
      {children}
    </div>
  );
}
