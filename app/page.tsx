'use client'

import { CategorySidebar } from '@/components/category-sidebar'
import Dock from '@/components/Dock'
import Heroname from '@/components/heroname'
import MeshGradient from '@/components/mesh-gradient'
import ProfilePopover from '@/components/profile-popover'
import Visualsname from '@/components/visualsname'
import { Skiper30 } from '@/components/ui/skiper-ui/skiper30'
import { useSelection } from '@/context/selection-context'
import { useBadgeSelection } from '@/hooks/use-badge-selection'
import { getItemsByCategory, workItems } from '@/lib/data'
import { WorkItem } from '@/lib/definitions'
import { ArrowUpRight, Eye } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HorizontalScroll } from '@/components/horizontal-scroll'
import { HorizontalPinScroll } from '@/components/horizontal-pin-scroll'
import Projectsname from '@/components/projectsname'

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
      <>
         <div className='fixed w-full h-dvh opacity-0 dark:opacity-25'>
            <MeshGradient colors={meshColors} speed={1} />
         </div>
         <div className='relative'>
            <Dock
               items={tabs}
               className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
               panelHeight={isMobile ? 60 : 68}
               baseItemSize={isMobile ? 42 : 50}
               magnification={isMobile ? 44 : 58}
            />

            {/* <div className='fixed inset-y-0 pr-2 right-0 z-10 flex items-center'>
            <CategorySidebar
               sidebarCategories={homeCategories}
               activeItemId=''
               isCategoriesOpen={false}
               badgeContainerRef={badgeContainerRef}
               onSelectItem={handleSelect}
               onHoverItem={setHoveredItem}
            />
         </div> */}

            <div className='relative flex flex-col gap-6 justify-end h-dvh mx-4 lg:mx-40 min-h-0'>
               <div className='absolute inset-y-0 -right-38 z-10 flex items-center'>
                  <CategorySidebar
                     sidebarCategories={homeCategories}
                     activeItemId=''
                     isCategoriesOpen={false}
                     badgeContainerRef={badgeContainerRef}
                     onSelectItem={handleSelect}
                     onHoverItem={setHoveredItem}
                  />
               </div>
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
                  <div className='h-auto w-md lg:h-[40dvh] lg:w-auto max-w-full'>
                     <Heroname />
                  </div>
               </div>
            </div>
            <Skiper30 />
            <div className='relative'>
               <HorizontalPinScroll
                  className='w-full dark:bg-black/60'
                  fixed={
                     <div className='flex flex-col items-center lg:gap-4'>
                        <div className='h-auto w-sm lg:w-[50dvw] p-4 max-w-full'>
                           <Visualsname />
                        </div>
                        <p className='lg:text-sm text-xs w-70 lg:w-80 text-muted-foreground text-center'>
                           Web and mobile designs built with the user experience in mind, made to stand out.
                        </p>
                     </div>
                  }
               >
                  <div className='flex gap-16 px-16 lg:px-30'>
                     <div className='flex flex-col gap-14 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0'>
                        <img className='h-[46dvw] lg:h-[34dvh] rounded-xl lg:rounded-3xl lg:mt-30 shadow-xl' src='/shmock.avif' />
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center transition-all p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>Slicehaus</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                     <div className='flex flex-col gap-14 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0'>
                        <img className='h-[46dvw] lg:h-[34dvh] dark:border rounded-xl lg:rounded-3xl lg:mt-30 shadow-xl' src='/asmock.avif' />
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>ArtSphere</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                     <div className='flex flex-col gap-2 lg:gap-4 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0 mr-300'>
                        <div className='overflow-hidden lg:mt-12 rounded-2xl lg:rounded-4xl shadow-xl border-5 border-black/80'>
                           <video autoPlay muted className='h-[68dvw] lg:h-[45dvh] scale-102' src='/bbvid.mp4' />
                        </div>
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>BondBook</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                  </div>
               </HorizontalPinScroll>
               <HorizontalPinScroll
                  className='w-full dark:bg-black/60'
                  fixed={
                     <div className='flex flex-col items-center lg:gap-4'>
                        <div className='h-auto w-sm lg:w-[50dvw] p-4 max-w-full'>
                           <Projectsname />
                        </div>
                        <p className='text-xs lg:text-sm w-70 lg:w-80 text-muted-foreground text-center'>
                           Web and mobile applications built with purpose, designed to perform and deliver.
                        </p>
                     </div>
                  }
               >
                  <div className='flex gap-16 px-16 lg:px-30'>
                     <div className='flex flex-col gap-14 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0'>
                        <div className='overflow-hidden lg:mt-26 rounded-xl lg:rounded-2xl shadow-xl'>
                           <video autoPlay muted className='h-[48dvw] lg:h-[36dvh] scale-101' src='/eresqsummary.mp4' />
                        </div>
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center transition-all p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>e-ResQ</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                     <div className='flex flex-col gap-14 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0'>
                        <div className='overflow-hidden lg:mt-26 rounded-xl lg:rounded-2xl shadow-xl'>
                           <video autoPlay muted className='h-[50dvw] lg:h-[38dvh] scale-101' src='/casapreview.mp4' />
                        </div>
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>Hotel Management</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                     <div className='flex flex-col gap-2 lg:gap-4 border rounded-4xl backdrop-blur-sm bg-white/2 size-[92dvw] lg:size-[70dvh] items-center justify-center shrink-0 mr-300'>
                        <div className='overflow-hidden lg:mt-12 rounded-2xl lg:rounded-4xl shadow-xl border-5 border-black/80'>
                           <video autoPlay muted className='h-[64dvw] lg:h-[45dvh] scale-100' src='/ipundar.mp4' />
                        </div>
                        <div className='lg:flex hidden opacity-0 hover:opacity-100 transition-all cursor-pointer flex-row items-center p-4 rounded-xl border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'>
                           <p>iPundar</p>
                           <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                        </div>
                     </div>
                  </div>
               </HorizontalPinScroll>
            </div>
         </div>
      </>
   )
}
