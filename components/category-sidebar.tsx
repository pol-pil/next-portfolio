'use client'

import { CategoryBadgeGroup } from '@/components/category-badge-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WorkItem } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { RefObject } from 'react'

type CategorySidebarProps = {
    sidebarCategories: Record<string, WorkItem[]>
    activeItemId: WorkItem['id']
    isCategoriesOpen: boolean
    badgeContainerRef: RefObject<HTMLDivElement | null>
    onSelectItem: (item: WorkItem) => void
    onHoverItem?: (item: WorkItem | null) => void
 }
 
 export function CategorySidebar({
    sidebarCategories,
    activeItemId,
    isCategoriesOpen,
    badgeContainerRef,
    onSelectItem,
    onHoverItem,
 }: CategorySidebarProps) {
    return (
      <div className='fixed right-0 bottom-16 z-20 lg:static lg:translate-y-0 pointer-events-none'>
         <ScrollArea
            className={cn(
               'transition-all duration-300 lg:[&_[data-slot=scroll-area-viewport]]:[mask-image:linear-gradient(to_bottom,transparent,black_180px,black_calc(100%-200px),transparent)] [&_[data-slot=scroll-area-scrollbar]]:hidden',
               'fixed bottom-0 z-20 w-fit max-h-[70vh]',
               isCategoriesOpen
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-0 translate-x-6 pointer-events-none',
               'lg:static lg:right-auto lg:top-auto lg:translate-y-0 lg:translate-x-0 lg:z-auto lg:w-full lg:h-90 lg:max-h-none lg:opacity-100 lg:pointer-events-auto'
            )}
         >
            <div ref={badgeContainerRef} className='px-4 lg:py-34'>
               {Object.entries(sidebarCategories).map(([category, items]) => (
                  <div key={category} className='py-2'>
                     <CategoryBadgeGroup
                        items={items}
                        selectedItemId={activeItemId}
                        onSelectItem={onSelectItem}
                        onHoverItem={onHoverItem}
                     />
                  </div>
               ))}
            </div>
         </ScrollArea>
      </div>
   )
}