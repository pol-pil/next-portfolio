'use client'

import { useRef } from 'react'
import { WorkItem } from '@/lib/definitions'

const MOBILE_BREAKPOINT = 1024

function isMobileViewport() {
   return window.innerWidth < MOBILE_BREAKPOINT
}

export function useBadgeSelection() {
   const badgeContainerRef = useRef<HTMLDivElement>(null)

   function centerSelectedBadge(itemId: WorkItem['id']) {
      const badge = badgeContainerRef.current?.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)

      badge?.scrollIntoView({
         behavior: 'smooth',
         block: 'center',
         inline: 'nearest',
      })
   }

   function scrollContentToTop(scrollAreaRef: React.RefObject<HTMLDivElement | null>) {
      if (isMobileViewport()) {
         window.scrollTo({ top: 0, behavior: 'smooth' })
         return
      }

      const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]')
      viewport?.scrollTo({ top: 0, behavior: 'smooth' })
   }

   function selectItem(
      item: WorkItem,
      scrollAreaRef: React.RefObject<HTMLDivElement | null>,
      onSelect: (item: WorkItem) => void
   ) {
      onSelect(item)
      requestAnimationFrame(() => centerSelectedBadge(item.id))
      scrollContentToTop(scrollAreaRef)
   }

   return { badgeContainerRef, centerSelectedBadge, scrollContentToTop, selectItem }
}