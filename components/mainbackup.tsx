import { useEffect, useMemo, useRef, useState } from 'react'
import { Maximize, Minimize, SquareTerminal, Wallpaper } from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'

import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Card } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
// import GradualBlurMemo from './ui/gradual-blur'
import { VideoPopOver } from './video-popover'
import { TextRoll } from './ui/skiper-ui/skiper58'
import Dock from './Dock'
import { Spinner } from './ui/spinner'
import { ModeToggle } from './mode-toggle'
import { type WorkItem, type SectionId, workItems, sections, getDefaultItem, getItemsByCategory } from './work-items'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { cn } from '../lib/utils'

// const LogoIcon = () => (
//    <svg width='15' height='15' viewBox='0 0 801 801' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
//       <path d='M0.00856119 90.5C0.808561 21.3 55.3419 1.33333 82.5086 0H528.5C619.167 1.66667 800.5 57.9 800.5 269.5C800.5 481.1 619.167 540 528.5 543H341C312.667 541.167 256 520.9 256 454.5C256 388.1 312.667 367.833 341 366H528.5C559.667 363.167 622 339.9 622 269.5C622 199.1 559.667 178.833 528.5 177.5H82.5086C54.6752 177.333 -0.791439 159.7 0.00856119 90.5Z' />
//       <path d='M0.00856119 334C0.00856119 280 55.0086 259.833 82.5086 256.5C148.509 256.5 173.003 308.167 177 334V459C177 560 263.5 622.5 341 622.5C418.5 622.5 431.5 691.5 431.5 710.5C431.5 729.5 419.5 801 341 801C262.5 801 165.5 763.991 82.5086 681C16.1154 614.607 -0.155252 505.336 0.00856119 459V334Z' />
//       <path d='M622 711.5C622 643.9 681.333 624 711 622.5C740.833 625 800.5 646.3 800.5 711.5C800.5 776.7 740.833 798.333 711 801C681.333 799.333 622 779.1 622 711.5Z' />
//    </svg>
// )

function ItemPreview({ item }: { item: WorkItem }) {
   const isPortrait = item.aspectRatio < 1
   const [popOpen, setPopOpen] = useState(false)
   const [isLoaded, setIsLoaded] = useState(false)
   const [isFullscreen, setIsFullscreen] = useState(false)
   const iframeRef = useRef<HTMLIFrameElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const handler = () => setIsFullscreen(!!document.fullscreenElement)
      document.addEventListener('fullscreenchange', handler)
      return () => document.removeEventListener('fullscreenchange', handler)
   }, [])

   useEffect(() => {
      if (!item.embedUrl) return
      setIsLoaded(false)

      const handler = (e: MessageEvent) => {
         if (e.origin !== 'https://www.figma.com') return
         if (e.data?.type === 'INITIAL_LOAD') {
            setTimeout(() => setIsLoaded(true), 300)
         }
      }

      window.addEventListener('message', handler)
      const fallback = setTimeout(() => setIsLoaded(true), 8000)

      return () => {
         window.removeEventListener('message', handler)
         clearTimeout(fallback)
      }
   }, [item.embedUrl])

   function toggleFullscreen() {
      const el = containerRef.current
      if (!el) return

      if (!document.fullscreenElement) {
         el.requestFullscreen?.()
      } else {
         document.exitFullscreen?.()
      }
   }

   if (item.video) {
      return (
         <div className='flex flex-col gap-4'>
            {isPortrait ? (
               <div className='flex justify-center' onClick={() => setPopOpen(true)}>
                  <div
                     className='cursor-pointer overflow-hidden rounded-lg'
                     style={{
                        height: `min(80vh, 90vw / ${item.aspectRatio})`,
                        width: `min(90vw, min(80vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
                     }}
                  >
                     <video
                        autoPlay
                        muted
                        playsInline
                        loop
                        className='h-full w-full object-cover'
                        src={item.thumbnail || item.video}
                     />
                  </div>
               </div>
            ) : (
               <div
                  className='cursor-pointer overflow-hidden rounded-lg'
                  style={{ aspectRatio: item.aspectRatio }}
                  onClick={() => setPopOpen(true)}
               >
                  <video
                     autoPlay
                     muted
                     playsInline
                     loop
                     className='h-full w-full object-cover'
                     src={item.thumbnail || item.video}
                  />
               </div>
            )}
            <VideoPopOver
               src={item.video}
               open={popOpen}
               onClose={() => setPopOpen(false)}
               aspectRatio={item.aspectRatio}
            />
            <ItemMeta item={item} />
         </div>
      )
   }

   const thumbnailOverlay = (
      <div
         style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transition: 'opacity 0.4s ease',
            opacity: isLoaded ? 0 : 1,
            pointerEvents: isLoaded ? 'none' : 'auto',
         }}
      >
         <img src={item.thumbnail} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         <div
            style={{
               position: 'absolute',
               inset: 0,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               background: 'rgba(0,0,0,0.8)',
            }}
         >
            <div className='flex flex-col justify-center items-center text-center'>
               <Spinner className='size-8 text-white' />
               <p className='text-white'>Loading Interactive Preview</p>
            </div>
         </div>
      </div>
   )

   const fullscreenButton = isLoaded && (
      <button
         onClick={toggleFullscreen}
         style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            zIndex: 10,
         }}
         className='rounded-md bg-black/50 p-1.5 text-white hover:bg-black/70 backdrop-blur-sm'
      >
         {isFullscreen ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
      </button>
   )

   return (
      <div className='flex h-full flex-col gap-4'>
         {item.embedUrl ? (
            isPortrait ? (
               <div className='flex justify-center'>
                  <div
                     ref={containerRef}
                     style={{
                        position: 'relative',
                        ...(isFullscreen && {
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           width: '100%',
                           height: '100%',
                           background: 'black',
                        }),
                     }}
                  >
                     {thumbnailOverlay}
                     <iframe
                        ref={iframeRef}
                        className='rounded-lg'
                        style={{
                           height: `min(80vh, 90vw / ${item.aspectRatio})`,
                           width: `min(90vw, min(80vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
                        }}
                        src={item.embedUrl}
                        title={item.title}
                     />
                     {fullscreenButton}
                  </div>
               </div>
            ) : (
               <div
                  ref={containerRef}
                  className='w-full overflow-hidden rounded-lg'
                  style={{ position: 'relative', aspectRatio: item.aspectRatio }}
               >
                  {thumbnailOverlay}
                  <iframe ref={iframeRef} className='h-full w-full rounded-lg' src={item.embedUrl} title={item.title} />
                  {fullscreenButton}
               </div>
            )
         ) : isPortrait ? (
            <div className='flex justify-center'>
               <PhotoProvider>
                  <PhotoView src={item.image}>
                     <img
                        className='rounded-lg object-contain'
                        style={{
                           height: 'min(80vh, 90vw / ' + item.aspectRatio + ')',
                           width: `min(90vw, min(80vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
                        }}
                        src={item.image}
                        alt={item.alt}
                     />
                  </PhotoView>
               </PhotoProvider>
            </div>
         ) : (
            <PhotoProvider>
               <PhotoView src={item.image}>
                  <div className='w-full overflow-hidden rounded-lg' style={{ aspectRatio: item.aspectRatio }}>
                     <img className='h-full w-full object-cover rounded-lg' src={item.image} alt={item.alt} />
                  </div>
               </PhotoView>
            </PhotoProvider>
         )}
         <ItemMeta item={item} />
      </div>
   )
}

function ExtraMediaGrid({ item }: { item: WorkItem }) {
   const [openVideo, setOpenVideo] = useState<string | null>(null)

   if (!item.extra || item.extra.length === 0) return null

   return (
      <>
         <PhotoProvider>
            <div className='flex flex-row flex-wrap gap-2 pb-20'>
               {item.extra.map((src, index) => {
                  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src)

                  if (isVideo) {
                     return (
                        <div
                           key={src}
                           onClick={() => setOpenVideo(src)}
                           className='w-full flex-1 min-w-35 h-[12em] shadow-md rounded-md overflow-hidden cursor-pointer'
                        >
                           <video src={src} autoPlay muted loop playsInline className='h-full w-full object-cover' />
                        </div>
                     )
                  }

                  return (
                     <PhotoView key={src} src={src}>
                        <img
                           src={src}
                           alt={`${item.title} extra ${index + 1}`}
                           className='w-full flex-1 min-w-35 h-[12em] shadow-md rounded-md object-cover'
                        />
                     </PhotoView>
                  )
               })}
            </div>
         </PhotoProvider>

         {openVideo && (
            <div
               className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'
               onClick={() => setOpenVideo(null)}
            >
               <video
                  src={openVideo}
                  controls
                  autoPlay
                  className='max-w-[90vw] max-h-[90vh] rounded-md'
                  onClick={(e) => e.stopPropagation()}
               />
            </div>
         )}
      </>
   )
}

function ItemMeta({ item }: { item: WorkItem }) {
   return (
      <div className='flex flex-col gap-6 border-none text-foreground/80'>
         <div className='flex flex-row p-4 justify-between items-center'>
            <div className='max-w-[70%]'>
               <p className='text-2xl lg:text-3xl font-semibold'>{item.description}</p>
               <p className='text-sm lg:text-md'>{item.info}</p>
            </div>
            <ItemTags item={item} />
         </div>

         <ExtraMediaGrid item={item} />
         {/* <div className='flex justify-end'>
            {item.details && <p className='xl:max-w-[45%] text-end text-lg'>{item.details}</p>}
         </div> */}
      </div>
   )
}

function ItemTags({ item }: { item: WorkItem }) {
   return (
      <div className='flex flex-wrap justify-end gap-2'>
         {item.tags.map(({ icon: Icon, label }) => (
            <Tooltip key={label}>
               <TooltipTrigger>
                  <div className='flex size-10 lg:size-12 items-center justify-center rounded-xl border'>
                     <Icon className='size-4 lg:size-6' />
                     {/* <p className='hidden lg:block'>{label}</p> */}
                  </div>
               </TooltipTrigger>
               <TooltipContent>
                  <p>{label}</p>
               </TooltipContent>
            </Tooltip>
         ))}
      </div>
   )
}

function WorkItemButton({
   item,
   isSelected,
   onSelect,
}: {
   item: WorkItem
   isSelected: boolean
   onSelect: (item: WorkItem) => void
}) {
   const [isHovered, setIsHovered] = useState(false)

   return (
      <Button
         type='button'
         variant='ghost'
         className={cn(
            'group relative w-full h-14 overflow-hidden rounded-lg p-0 border-0',
            isSelected && 'shadow-2xl'
         )}
         aria-pressed={isSelected}
         onClick={() => onSelect(item)}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <img className='absolute inset-0 h-full w-full object-cover' src={item.image} alt={item.alt} />

         {/* Overlay: invisible by default, darkens on hover */}
         <div
            className={cn(
               'absolute inset-0 bg-white dark:bg-black transition-opacity duration-500',
               isHovered ? 'opacity-80' : 'opacity-86',
               isSelected && 'opacity-40 bg-black'
            )}
         />

         {/* Text: hidden by default, fades in on hover */}
         <div
            className={cn(
               'relative z-10 flex h-full w-full items-center justify-center px-2 transition-opacity duration-500 dark:text-white text-black',
               isHovered ? 'opacity-100' : 'opacity-0',
               isSelected && 'opacity-100'
            )}
         >
            {item.icon ? (
               <img
                  src={item.icon}
                  className={cn('absolute inset-0 m-auto size-38 brightness-0 dark:invert', isSelected && 'invert')}
               />
            ) : (
               <TextRoll
                  animate={isHovered ? 'hovered' : 'initial'}
                  className={cn('font-semibold lg:font-bold text-xl uppercase', isSelected && 'text-white')}
               >
                  {item.title}
               </TextRoll>
            )}
         </div>
      </Button>
   )
}

export function ResizableMain() {
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
      ...sections.map((section) => ({
         icon: section.id === 'visuals' ? <Wallpaper className='size-5' /> : <SquareTerminal className='size-5' />,
         label: section.label,
         className: 'rounded-lg border-[1px]',
         isActive: activeSection === section.id,
         onClick: () => handleSectionChange(section.id),
      })),
      {
         icon: <ModeToggle />,
         label: 'Theme',
         className: 'rounded-full border-[1px] border-none shadow-none',
         isActive: false,
         onClick: () => {},
      },
      ...(isMobile
         ? [
              {
                 icon: (
                    <Avatar className='size-12'>
                       <AvatarImage src='/polpr.avif' alt='John Paul Pilar' />
                    </Avatar>
                 ),
                 label: 'Contact',
                 className: 'rounded-full border-[1px] ml-20 border-none shadow-none',
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
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white dark:bg-neutral-900 bg-neutral-50 transition-all duration-300 ${
               isMobile && isAtBottom && selectedItem.id !== 'eResq-app' && selectedItem.id !== 'casa-app'
                  ? 'opacity-0 pointer-events-none translate-y-20'
                  : 'opacity-100 translate-y-0'
            }`}
            panelHeight={70}
            baseItemSize={50}
            magnification={60}
         />

         <div className='min-w-0 flex-1 lg:h-full border-none p-0 pb-20 lg:pb-0'>
            <Tabs value={activeSection} onValueChange={handleSectionChange} className='h-full'>
               {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className='min-h-0'>
                     <ScrollArea className='h-full w-full lg:px-4'>
                        <ItemPreview
                           item={selectedItem.section === section.id ? selectedItem : getDefaultItem(section.id)}
                        />
                     </ScrollArea>
                  </TabsContent>
               ))}
            </Tabs>
         </div>

         <div className='flex flex-col min-w-0 space-y-4 gap-2 lg:gap-0 lg:max-w-64'>
            <Card className='border-none lg:rounded-br-[4em] md:rounded-tr-xl sm:rounded-tr-[4em] shadow-lg hidden lg:block'>
               <a href='https://www.linkedin.com/in/johnpaulpilar/' target='_blank' rel='noopener noreferrer'>
                  <div className='flex h-full flex-row gap-3 p-4 text-center items-center'>
                     <Avatar className='size-12'>
                        <AvatarImage src='/polpr.avif' alt='John Paul Pilar' />
                     </Avatar>
                     <div className='flex flex-col items-start truncate'>
                        <span className='font-semibold'>John Paul Pilar</span>
                        <span className='text-xs'>Designer/Developer</span>
                     </div>
                  </div>
               </a>
            </Card>

            <Card className='min-h-0 border-none py-0 overflow-hidden sm:rounded-br-[4em] md:rounded-br-xl lg:rounded-tr-[4em] shadow-lg w-full mb-4 lg:mb-0'>
               <ScrollArea className='h-full w-full'>
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
