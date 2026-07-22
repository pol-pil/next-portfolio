'use client'

import Dock from '@/components/Dock'
import ItemPreview from '@/components/item-preview'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { getDefaultItem, getItemsByCategory, sections, workItems } from '@/lib/data'
import { SectionId, WorkItem } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { Astroid, ChevronDown, ChevronUp, Code, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

const MOBILE_BREAKPOINT = 1024

function isMobileViewport() {
   return window.innerWidth < MOBILE_BREAKPOINT
}

function scrollScrollAreaToTop(scrollAreaRef: React.RefObject<HTMLDivElement | null>) {
   const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]')
   viewport?.scrollTo({ top: 0, behavior: 'smooth' })
}

type CategoryBadgeGroupProps = {
   items: WorkItem[]
   selectedItemId: WorkItem['id']
   onSelectItem: (item: WorkItem) => void
}

function CategoryBadgeGroup({ items, selectedItemId, onSelectItem }: CategoryBadgeGroupProps) {
   return (
      <div className='flex flex-col w-20 space-y-2 items-end'>
         {items.map((item) => {
            const isSelected = item.id === selectedItemId
            return (
               <Badge
                  key={item.id}
                  data-item-id={item.id}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => onSelectItem(item)}
                  className={cn(
                     'text-sm h-8 px-3 lg:text-xs lg:h-6 lg:px-2 cursor-pointer transition-colors bg-white/60 dark:bg-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
                     isSelected && 'dark:bg-white/100 text-primary-foreground border-primary hover:bg-primary/90'
                  )}
               >
                  {item.title}
               </Badge>
            )
         })}
      </div>
   )
}

export default function Page() {
   const router = useRouter()
   const [activeSection, setActiveSection] = useState<SectionId>('visuals')
   const [selectedItemId, setSelectedItemId] = useState(getDefaultItem('visuals').id)
   const [isMobile, setIsMobile] = useState(false)
   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

   const selectedItem = workItems.find((item) => item.id === selectedItemId) ?? getDefaultItem(activeSection)
   const sectionItems = useMemo(() => workItems.filter((item) => item.section === activeSection), [activeSection])
   const sidebarCategories = useMemo(() => getItemsByCategory(sectionItems), [sectionItems])

   const scrollRef = useRef<HTMLDivElement>(null)
   const badgeContainerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const updateIsMobile = () => setIsMobile(isMobileViewport())

      updateIsMobile()
      window.addEventListener('resize', updateIsMobile)

      return () => window.removeEventListener('resize', updateIsMobile)
   }, [])

   function handleSectionChange(value: string) {
      const nextSection = value as SectionId
      setActiveSection(nextSection)
      setSelectedItemId(getDefaultItem(nextSection).id)
   }

   function handleItemSelect(item: WorkItem) {
      setActiveSection(item.section)
      setSelectedItemId(item.id)
   
      requestAnimationFrame(() => centerSelectedBadge(item.id))
   
      if (isMobileViewport()) {
         window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
         scrollScrollAreaToTop(scrollRef)
      }
   }

   function centerSelectedBadge(itemId: WorkItem['id']) {
      const badge = badgeContainerRef.current?.querySelector<HTMLElement>(
         `[data-item-id="${itemId}"]`
      )
   
      badge?.scrollIntoView({
         behavior: 'smooth',
         block: 'center',
         inline: 'nearest',
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
         icon: (
            <Avatar className='size-7'>
               <AvatarImage src='/polp1.avif' alt='John Paul Pilar' />
            </Avatar>
         ),
         label: 'Contact',
         isTransparent: true,
         className: 'rounded-full border-none shadow-none',
         isActive: false,
         onClick: () => {
            window.open('https://www.linkedin.com/in/johnpaulpilar/', '_blank', 'noopener,noreferrer')
         },
      },
   ]

   return (
      <div className='lg:flex gap-4 px-4 lg:px-0 space-y-0 h-full text-foreground items-center justify-end'>
         <Dock
            items={dockItems}
            className='fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
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

            <div className='fixed right-0 bottom-16 z-20 lg:static lg:translate-y-0'>
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
                              selectedItemId={selectedItemId}
                              onSelectItem={handleItemSelect}
                           />
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </div>
         </div>

         <div className='min-w-0 flex-1 lg:h-full border-none p-0 pb-8 lg:pb-0'>
            <Tabs value={activeSection} onValueChange={handleSectionChange} className='h-full'>
               {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className='min-h-0'>
                     <ScrollArea
                        ref={scrollRef}
                        className='h-full w-full
      [&_[data-slot=scroll-area-viewport]]:sm:px-8
      [&_[data-slot=scroll-area-viewport]]:xl:px-46
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
