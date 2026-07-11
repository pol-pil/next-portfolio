'use client'

import Dock from '@/components/Dock'
import ItemPreview from '@/components/item-preview'
import { ModeToggle } from '@/components/mode-toggle'
import MyCard from '@/components/my-card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import WorkItemButton from '@/components/work-item-button'
import { getDefaultItem, getItemsByCategory, sections, workItems } from '@/lib/data'
import { SectionId, WorkItem } from '@/lib/definitions'
import { SquareTerminal, Wallpaper } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Page() {
   const router = useRouter()
   const [activeSection, setActiveSection] = useState<SectionId>('visuals')
   const [selectedItemId, setSelectedItemId] = useState(getDefaultItem('visuals').id)

   const selectedItem = workItems.find((item) => item.id === selectedItemId) ?? getDefaultItem(activeSection)
   const sectionItems = useMemo(() => workItems.filter((item) => item.section === activeSection), [activeSection])
   const sidebarCategories = useMemo(() => getItemsByCategory(sectionItems), [sectionItems])

   const scrollRef = useRef<HTMLDivElement>(null)

   function handleSectionChange(value: string) {
      const nextSection = value as SectionId
      setActiveSection(nextSection)
      setSelectedItemId(getDefaultItem(nextSection).id)
   }

   function handleItemSelect(item: WorkItem) {
      setActiveSection(item.section)
      setSelectedItemId(item.id)

      const isMobile = window.innerWidth < 1024
      if (isMobile) {
         window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
         scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      }
   }

   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      const checkSize = () => setIsMobile(window.innerWidth < 1024)

      checkSize()
      window.addEventListener('resize', checkSize)

      return () => window.removeEventListener('resize', checkSize)
   }, [])

   const tabs = [
      {
         icon: <img src='/icon.svg' alt='Logo' className='size-4 brightness-0 dark:invert' />,
         label: 'Paul Pilar',
         className: 'rounded-lg',
         onClick: () => router.push('/'),
         isActive: false,
         isTransparent: true,
      },
      ...sections.map((section) => ({
         icon: section.id === 'visuals' ? <Wallpaper className='size-5' /> : <SquareTerminal className='size-5' />,
         label: section.label,
         className: 'rounded-lg',
         isActive: activeSection === section.id,
         onClick: () => handleSectionChange(section.id),
      })),
      {
         icon: <ModeToggle />,
         label: 'Theme',
         className: 'rounded-full shadow-none',
         isTransparent: true,
         isActive: false,
         onClick: () => {},
      },
      ...(isMobile
         ? [
              {
                 icon: (
                    <Avatar className='size-10'>
                       <AvatarImage src='/polp1.avif' alt='John Paul Pilar' />
                    </Avatar>
                 ),
                 label: 'Contact',
                 isTransparent: true,
                 className: 'rounded-full ml-6 border-none shadow-none',
                 isActive: false,
                 onClick: () => {
                    window.open('https://www.linkedin.com/in/johnpaulpilar/', '_blank', 'noopener,noreferrer')
                 },
              },
           ]
         : []),
   ]

   const [isAtBottom, setIsAtBottom] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 // 5px tolerance

         setIsAtBottom(bottom)
      }

      handleScroll()
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   return (
      <div className='lg:flex gap-4 space-y-0 h-full text-foreground'>
         <Dock
            items={tabs}
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300  border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${
               isMobile && isAtBottom ? 'opacity-0 pointer-events-none translate-y-20' : 'opacity-100 translate-y-0'
            }`}
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />

         <div className='min-w-0 flex-1 lg:h-full border-none p-0 pb-20 lg:pb-0'>
            <Tabs value={activeSection} onValueChange={handleSectionChange} className='h-full'>
               {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className='min-h-0'>
                     <ScrollArea className='h-full w-full lg:px-4 [&_[data-slot=scroll-area-viewport]]:[mask-image:linear-gradient(to_bottom,transparent,black_0px,black_calc(97%-0px),transparent)]'>
                        <ItemPreview
                           item={selectedItem.section === section.id ? selectedItem : getDefaultItem(section.id)}
                        />
                     </ScrollArea>
                  </TabsContent>
               ))}
            </Tabs>
         </div>

         <div className='flex flex-col pb-4 min-w-0 space-y-4 gap-2 lg:gap-0 lg:max-w-60'>
            <MyCard />

            <Card className='min-h-0 border-none py-0 overflow-hidden sm:rounded-br-[4em] md:rounded-br-xl lg:rounded-tr-[4em] shadow-lg w-full mb-4 lg:mb-0 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] '>
               <ScrollArea className='h-full w-full [&_[data-slot=scroll-area-viewport]]:[mask-image:linear-gradient(to_bottom,transparent,black_10px,black_calc(100%-10px),transparent)]'>
                  <div className='px-4 w-full'>
                     {Object.entries(sidebarCategories).map(([category, items], _index) => (
                        <div key={category} className='space-y-2 py-4 w-full'>
                           <p className='text-sm font-medium text-muted-foreground'>{category}</p>
                           <div className='space-y-2 w-full'>
                              {items.map((item) => (
                                 <WorkItemButton
                                    key={item.id}
                                    item={item}
                                    isSelected={selectedItem.id === item.id}
                                    onSelect={handleItemSelect}
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </Card>
         </div>
      </div>
   )
}
