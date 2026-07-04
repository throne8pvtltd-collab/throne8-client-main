import { ReactNode } from 'react';

export default function AuthRightContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 sm:space-y-5">
        {children}
      </div>
    </div>
  );
}