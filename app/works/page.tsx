'use client'

import Dock from '@/components/Dock'
import ItemPreview from '@/components/item-preview'
import ProfilePopover from '@/components/profile-popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { getDefaultItem, getItemsByCategory, sections, workItems } from '@/lib/data'
import { SectionId, WorkItem } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { Astroid, Code, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useBadgeSelection } from '@/hooks/use-badge-selection'
import { useSelection } from '@/context/selection-context'
import { CategorySidebar } from '@/components/category-sidebar'

const MOBILE_BREAKPOINT = 1024

function isMobileViewport() {
   return window.innerWidth < MOBILE_BREAKPOINT
}

export default function Page() {
   const router = useRouter()
   const { selectedItemId, setSelectedItemId } = useSelection()
   const [activeSection, setActiveSection] = useState<SectionId>('visuals')
   const [isMobile, setIsMobile] = useState(false)
   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
   const selectedItem = workItems.find((item) => item.id === selectedItemId) ?? getDefaultItem(activeSection)
   const activeItemId = selectedItemId ?? selectedItem.id
   const sectionItems = useMemo(() => workItems.filter((item) => item.section === activeSection), [activeSection])
   const sidebarCategories = useMemo(() => getItemsByCategory(sectionItems), [sectionItems])
   const scrollRef = useRef<HTMLDivElement>(null)
   const { badgeContainerRef, selectItem, centerSelectedBadge } = useBadgeSelection()

   useEffect(() => {
      if (!selectedItemId) {
         setSelectedItemId(getDefaultItem('visuals').id)
      }
   }, [])

   useEffect(() => {
      const updateIsMobile = () => setIsMobile(isMobileViewport())

      updateIsMobile()
      window.addEventListener('resize', updateIsMobile)

      return () => window.removeEventListener('resize', updateIsMobile)
   }, [])

   useEffect(() => {
      if (activeItemId) {
         const timeout = setTimeout(() => centerSelectedBadge(activeItemId), 100)
         return () => clearTimeout(timeout)
      }
   }, [activeItemId])

   function handleSectionChange(value: string) {
      const nextSection = value as SectionId
      setActiveSection(nextSection)
      setSelectedItemId(getDefaultItem(nextSection).id)
   }

   function handleItemSelect(item: WorkItem) {
      selectItem(item, scrollRef, (selected) => {
         setActiveSection(selected.section)
         setSelectedItemId(selected.id)
      })
   }

   const dockItems = [
      {
         icon: <img src='/icon.svg' alt='Logo' className='size-4 brightness-0 dark:invert' />,
         label: 'Paul Pilar',
         className: 'rounded-lg',
         onClick: () => router.push('/'),
         isActive: false,
         isTransparent: true,
      },
      ...sections.map((section) => ({
         icon: section.id === 'visuals' ? <Astroid className='size-5' /> : <Code className='size-5' />,
         label: section.label,
         className: 'rounded-lg',
         isActive: activeSection === section.id,
         onClick: () => handleSectionChange(section.id),
      })),
      {
         icon: <ProfilePopover />,
         label: 'Contact',
         isTransparent: true,
         className: 'rounded-full border-none shadow-none',
         isActive: false,
         onClick: () => {},
      },
   ]

   return (
      <div className='lg:flex gap-4 px-4 lg:px-0 space-y-0 h-full text-foreground items-center justify-end'>
         <Dock
            items={dockItems}
            className='fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-zinc-100/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />

         <div
            onClick={() => setIsCategoriesOpen(false)}
            aria-hidden={!isCategoriesOpen}
            className={cn(
               'lg:hidden fixed inset-0 z-2 bg-black/50 transition-opacity duration-300',
               isCategoriesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
         />

         <div className='fixed p-2 z-2 min-h-0 border-none py-0 overflow-hidden flex flex-col items-center lg:block'>
            <button
               onClick={() => setIsCategoriesOpen((prev) => !prev)}
               aria-label={isCategoriesOpen ? 'Collapse categories' : 'Expand categories'}
               className='lg:hidden fixed bottom-5 right-4 z-30 flex items-center justify-center size-9 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-md transition-transform active:scale-95'
            >
               {isCategoriesOpen ? <X className='size-4' /> : <Menu className='size-4' />}
            </button>

            <CategorySidebar
               sidebarCategories={sidebarCategories}
               activeItemId={activeItemId}
               isCategoriesOpen={isCategoriesOpen}
               badgeContainerRef={badgeContainerRef}
               onSelectItem={handleItemSelect}
            />
         </div>

         <div className='min-w-0 flex-1 lg:h-full border-none p-0 pb-8 lg:pb-0'>
            <Tabs value={activeSection} onValueChange={handleSectionChange} className='h-full'>
               {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className='min-h-0'>
                     <ScrollArea
                        ref={scrollRef}
                        className='h-full w-full
                           [&_[data-slot=scroll-area-viewport]]:sm:px-8
                           [&_[data-slot=scroll-area-viewport]]:lg:px-58
                           [&_[data-slot=scroll-area-viewport]]:[mask-image:linear-gradient(to_bottom,transparent,black_0px,black_calc(97%-0px),transparent)]'
                     >
                        <ItemPreview
                           item={selectedItem.section === section.id ? selectedItem : getDefaultItem(section.id)}
                        />
                     </ScrollArea>
                  </TabsContent>
               ))}
            </Tabs>
         </div>
      </div>
   )
}
