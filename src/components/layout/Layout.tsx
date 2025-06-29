import { mergeClassNames } from '@/utils/mergeClassNames';
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
  direction: 'row' | 'column';
  fullScreen?: boolean;
  className?: string;
}

export default function Layout({
  direction,
  fullScreen = false,
  className,
  children,
}: LayoutProps) {
  return (
    <main
      className={mergeClassNames(
        `flex ${direction === 'column' ? 'flex-col' : 'flex-row'} 
        ${fullScreen ? 'w-full max-w-none' : 'w-auto max-w-sm'} 
        h-screen
        mx-auto my-0        
        bg-background
        `,
        className
      )}
    >
      {children}
    </main>
  );
}
