
import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden group flex flex-col h-full relative animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] m-2 rounded-[1.5rem] bg-stone-200" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="w-2/3">
            <div className="h-5 bg-stone-200 rounded-lg w-full mb-2" />
            <div className="h-4 bg-emerald-50 rounded-lg w-1/2" />
          </div>
          <div className="w-10 h-6 bg-amber-50 rounded-lg" />
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-stone-100 rounded-lg w-full" />
          <div className="h-3 bg-stone-100 rounded-lg w-4/5" />
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="w-20 h-6 bg-stone-200 rounded-lg" />
          <div className="w-24 h-10 bg-emerald-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
