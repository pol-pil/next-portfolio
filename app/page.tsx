'use client'

import { CategorySidebar } from '@/components/category-sidebar'
import Dock from '@/components/Dock'
import Heroname from '@/components/heroname'
import MeshGradient from '@/components/mesh-gradient'
import ProfilePopover from '@/components/profile-popover'
import { useSelection } from '@/context/selection-context'
import { useBadgeSelection } from '@/hooks/use-badge-selection'
import { getItemsByCategory, workItems } from '@/lib/data'
import { WorkItem } from '@/lib/definitions'
import { Eye } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const homeItems = workItems.filter((item) => item.section === 'visuals')
const homeCategories = getItemsByCategory(homeItems)
const DEFAULT_MESH_COLORS = ['#1e3a8a', '#1e3a8a', '#000000']

export default function Home() {
   const router = useRouter()
   const [isMobile, setIsMobile] = useState(false)
   const { theme } = useTheme()
   const { setSelectedItemId } = useSelection()
   const { badgeContainerRef } = useBadgeSelection()
   const [hoveredItem, setHoveredItem] = useState<WorkItem | null>(null)
   const meshColors = hoveredItem?.color ? [hoveredItem.color, hoveredItem.color, '#000000'] : DEFAULT_MESH_COLORS
   const [layers, setLayers] = useState<[WorkItem | null, WorkItem | null]>([null, null])
   const [activeLayer, setActiveLayer] = useState<0 | 1>(0)

   useEffect(() => {
      if (!hoveredItem) return

      const currentSrc = layers[activeLayer]?.mockup || layers[activeLayer]?.image
      const nextSrc = hoveredItem.mockup || hoveredItem.image
      if (currentSrc === nextSrc) return

      const nextLayer = activeLayer === 0 ? 1 : 0
      setLayers((prev) => {
         const updated = [...prev] as [WorkItem | null, WorkItem | null]
         updated[nextLayer] = hoveredItem
         return updated
      })
      setActiveLayer(nextLayer)
   }, [hoveredItem])

   function handleSelect(item: WorkItem) {
      setSelectedItemId(item.id)
      router.push('/works')
   }

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
      {
         icon: <Eye className='size-5' />,
         label: 'Works',
         className: 'rounded-lg',
         onClick: () => {
            setSelectedItemId('slicehaus-layout')
            router.push('/works')
         },
      },
      {
         icon: <ProfilePopover />,
         label: 'Contact',
         isTransparent: true,
         className: 'rounded-full ml-2 border-none shadow-none',
         isActive: false,
         onClick: () => {},
      },
   ]

   return (
      <div className='relative'>
         <Dock
            items={tabs}
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />
         <div className='fixed inset-y-0 pr-2 right-0 z-10 flex items-center'>
            <CategorySidebar
               sidebarCategories={homeCategories}
               activeItemId=''
               isCategoriesOpen={false}
               badgeContainerRef={badgeContainerRef}
               onSelectItem={handleSelect}
               onHoverItem={setHoveredItem}
            />
         </div>

         <div className='absolute w-full h-full opacity-0 dark:opacity-20'>
            <MeshGradient colors={meshColors} speed={2} />
         </div>

         <div className='relative flex flex-col gap-6 justify-end h-dvh mx-4 lg:mx-40 min-h-0'>
            <div className='flex justify-end min-h-0'>
               <div
                  className='relative overflow-hidden rounded-lg transition-opacity mt-4 duration-500 ease-in-out h-[28dvh] sm:h-[34dvh] lg:h-[42dvh] max-w-full'
                  style={{ aspectRatio: 16 / 9, opacity: hoveredItem ? 1 : 0 }}
               >
                  {layers.map((item, i) => (
                     <img
                        key={i}
                        className='absolute inset-0 h-full w-full object-cover rounded-lg transition-opacity duration-500 ease-in-out'
                        style={{ opacity: activeLayer === i ? 1 : 0 }}
                        src={item ? item.mockup || item.image : undefined}
                        alt={item?.alt ?? ''}
                     />
                  ))}
               </div>
            </div>
            <div className='flex mb-24 min-h-0'>
               <div className='h-auto w-3xl lg:h-[40dvh] lg:w-auto max-w-full'>
                  <Heroname mode={theme === 'light' ? 'light' : 'dark'} />
               </div>
            </div>
         </div>
      </div>
   )
}
