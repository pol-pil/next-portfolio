'use client'

import { Badge } from '@/components/ui/badge'
import { WorkItem } from '@/lib/definitions'
import { cn } from '@/lib/utils'

type CategoryBadgeGroupProps = {
   items: WorkItem[]
   selectedItemId: WorkItem['id']
   onSelectItem: (item: WorkItem) => void
   onHoverItem?: (item: WorkItem | null) => void
}

export function CategoryBadgeGroup({ items, selectedItemId, onSelectItem, onHoverItem }: CategoryBadgeGroupProps) {
   return (
      <div className='flex flex-col w-28 space-y-2 items-end'>
         {items.map((item) => {
            const isSelected = item.id === selectedItemId
            return (
               <Badge
                  key={item.id}
                  data-item-id={item.id}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => onSelectItem(item)}
                  onMouseEnter={() => onHoverItem?.(item)}
                  onMouseLeave={() => onHoverItem?.(null)}
                  className={cn(
                     'text-sm h-8 px-3 lg:text-xs lg:h-6 lg:px-2 cursor-pointer transition-colors bg-white/60 dark:bg-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
                     isSelected && 'dark:bg-white/100 bg-black/90 dark:text-black text-white border-primary hover:bg-primary/90'
                  )}
               >
                  {item.title}
               </Badge>
            )
         })}
      </div>
   )
}