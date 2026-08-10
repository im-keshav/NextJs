import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Product Image Skeleton */}
      <Skeleton className="h-60 w-full rounded-none" />

      {/* Product Details Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2.5">
          {/* Category Pill */}
          <Skeleton className="h-5 w-20 rounded-full" />

          {/* Title */}
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-3/4 rounded-md" />

          {/* Description */}
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-4/5 rounded-md" />
        </div>

        <div>
          {/* Price + Rating */}
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export default Loading