import React from 'react';
import { cn } from '@/src/lib/utils';

interface AdSpaceProps {
  className?: string;
  position?: 'top' | 'bottom' | 'sidebar';
}

export const AdSpace: React.FC<AdSpaceProps> = ({ className, position = 'top' }) => {
  return (
    <div className={cn(
      "w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-4",
      position === 'sidebar' ? "h-full min-h-[600px]" : "my-8 min-h-[250px]",
      className
    )}>
      <span className="text-xs font-mono text-gray-700 font-bold uppercase tracking-widest mb-2">Advertisement</span>
      <div className="w-full bg-white/50 border border-gray-200 rounded flex items-center justify-center py-4">
        {/* Sample AdSense code placeholder */}
        {/* <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins> */}
        <p className="text-sm text-gray-600 italic">Google AdSense Space</p>
      </div>
    </div>
  );
};
