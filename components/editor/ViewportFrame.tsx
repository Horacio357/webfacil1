'use client';

import React from 'react';
import { ViewportDevice } from '@/lib/types';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

interface ViewportFrameProps {
  device: ViewportDevice;
  children: React.ReactNode;
}

export const ViewportFrame: React.FC<ViewportFrameProps> = ({ device, children }) => {
  if (device === 'desktop') {
    return <div className="w-full min-h-screen bg-white shadow-sm transition-all">{children}</div>;
  }

  const isTablet = device === 'tablet';

  return (
    <div className="py-8 px-4 flex justify-center bg-slate-900/95 min-h-[calc(100vh-64px)] overflow-x-auto transition-all">
      <div
        className={`relative bg-white shadow-2xl rounded-[36px] border-[12px] border-slate-800 flex flex-col overflow-hidden transition-all duration-500 ${
          isTablet ? 'w-[768px] min-h-[1024px]' : 'w-[375px] min-h-[667px]'
        }`}
      >
        {/* Device Top Speaker & Camera notch */}
        <div className="w-full bg-slate-800 py-1.5 flex justify-center items-center gap-2 border-b border-slate-700 select-none">
          <div className="w-2 h-2 rounded-full bg-slate-600" />
          <div className="w-12 h-1.5 rounded-full bg-slate-700" />
        </div>

        {/* Device Viewport content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white">
          {children}
        </div>

        {/* Device Bottom Home indicator */}
        <div className="w-full bg-slate-800 py-2 flex justify-center items-center select-none">
          <div className="w-28 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
