'use client'

import { WorkItem } from '@/lib/definitions'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Spinner } from './ui/spinner'
import { Maximize, Minimize } from 'lucide-react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import ItemMeta from './item-meta'
import 'react-photo-view/dist/react-photo-view.css'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function ItemPreview({ item }: { item: WorkItem }) {
   const isPortrait = item.aspectRatio < 1
   const [popOpen, setPopOpen] = useState(false)
   const [isLoaded, setIsLoaded] = useState(false)
   const [isFullscreen, setIsFullscreen] = useState(false)
   const [showEmbed, setShowEmbed] = useState(false)
   const iframeRef = useRef<HTMLIFrameElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const bgVideoRef = useRef<HTMLVideoElement>(null)
   const prevItemId = useRef(item.id)

   useEffect(() => {
      if (prevItemId.current !== item.id) {
         prevItemId.current = item.id
         setShowEmbed(false)
         setIsLoaded(false)
         setPopOpen(false)
      }
   }, [item.id])

   useEffect(() => {
      const handler = () => setIsFullscreen(!!document.fullscreenElement)
      document.addEventListener('fullscreenchange', handler)
      return () => document.removeEventListener('fullscreenchange', handler)
   }, [])

   useEffect(() => {
      if (!item.embedUrl || !showEmbed) return
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
   }, [item.embedUrl, showEmbed])

   // Pause/resume the background thumbnail video when modal opens/closes
   useEffect(() => {
      const bg = bgVideoRef.current
      if (!bg) return

      if (popOpen) {
         bg.pause()
      } else {
         bg.play().catch(() => {})
      }
   }, [popOpen])

   function toggleFullscreen() {
      const el = containerRef.current
      if (!el) return

      if (!document.fullscreenElement) {
         el.requestFullscreen?.()
      } else {
         document.exitFullscreen?.()
      }
   }

   const thumbnailOverlay = (
      <div
         className={cn(
            'absolute inset-0 z-2 overflow-hidden rounded-lg transition-opacity duration-400',
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
         )}
      >
         <img src={item.load} alt='' className='h-full w-full object-cover' />
         <div className='absolute inset-0 flex items-center justify-center bg-black/80'>
            <div className='flex flex-col justify-center items-center text-center'>
               <Spinner className='size-8 text-white' />
               <p className='text-white'>Loading Interactive Preview</p>
            </div>
         </div>
      </div>
   )

   const fullscreenButton = isLoaded && (
      <Button
         onClick={toggleFullscreen}
         className='absolute bottom-2 right-2 z-10 rounded-md bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70'
      >
         {isFullscreen ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
      </Button>
   )

   const embedPoster = (
      <div
         className='relative h-full w-full cursor-pointer overflow-hidden rounded-lg'
         onClick={() => setShowEmbed(true)}
      >
         <img src={item.thumbnail} alt={item.alt} className='h-full w-full object-cover rounded-lg' />
      </div>
   )

   if (item.video) {
      return (
         <div className='flex flex-col gap-2 pt-4'>
            {isPortrait ? (
               <div className='flex justify-center'>
                  <div
                     ref={containerRef}
                     style={{
                        position: 'relative',
                        height: `min(86vh, 90vw / ${item.aspectRatio})`,
                        width: `min(90vw, min(86vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
                        ...(isFullscreen && {
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           width: '100%',
                           height: '100%',
                           background: 'black',
                        }),
                     }}
                     className='overflow-hidden rounded-lg'
                  >
                     {showEmbed && item.embedUrl ? (
                        <>
                           {thumbnailOverlay}
                           <iframe
                              ref={iframeRef}
                              className='h-full w-full rounded-lg'
                              src={item.embedUrl}
                              title={item.title}
                           />
                           {fullscreenButton}
                        </>
                     ) : (
                        <div
                           className='h-full w-full cursor-pointer overflow-hidden rounded-lg'
                           onClick={() => setPopOpen(true)}
                        >
                           <video
                              ref={bgVideoRef}
                              autoPlay
                              muted
                              playsInline
                              loop
                              className='h-full w-full object-cover'
                              src={item.thumbnail || item.video}
                           />
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               <div
                  ref={containerRef}
                  className='w-full overflow-hidden rounded-lg relative'
                  style={{ aspectRatio: item.aspectRatio }}
               >
                  {showEmbed && item.embedUrl ? (
                     <>
                        {thumbnailOverlay}
                        <iframe
                           ref={iframeRef}
                           className='h-full w-full rounded-lg'
                           src={item.embedUrl}
                           title={item.title}
                        />
                        {fullscreenButton}
                     </>
                  ) : (
                     <video
                        ref={bgVideoRef}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className='h-full w-full cursor-pointer object-cover'
                        onClick={() => setPopOpen(true)}
                        src={item.thumbnail || item.video}
                     />
                  )}
               </div>
            )}

            {popOpen &&
               typeof document !== 'undefined' &&
               createPortal(
                  <div
                     className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-200'
                     onClick={() => setPopOpen(false)}
                  >
                     <video
                        key={item.video}
                        src={item.video}
                        controls
                        autoPlay
                        playsInline
                        className='max-w-[90vw] max-h-[90vh] rounded-md'
                        onClick={(e) => e.stopPropagation()}
                     />
                  </div>,
                  document.body
               )}

            <ItemMeta
               item={item}
               showViewButton={!!item.embedUrl}
               embedActive={showEmbed}
               onView={() => setShowEmbed(true)}
               onClose={() => setShowEmbed(false)}
            />
         </div>
      )
   }

   return (
      <div className='h-full pt-4'>
         {item.embedUrl ? (
            isPortrait ? (
               <div className='flex justify-center'>
                  <div
                     ref={containerRef}
                     style={{
                        position: 'relative',
                        height: `min(80vh, 90vw / ${item.aspectRatio})`,
                        width: `min(90vw, min(80vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
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
                     {showEmbed ? (
                        <>
                           {thumbnailOverlay}
                           <iframe
                              ref={iframeRef}
                              className='rounded-lg'
                              style={{ height: '100%', width: '100%' }}
                              src={item.embedUrl}
                              title={item.title}
                           />
                           {fullscreenButton}
                        </>
                     ) : (
                        embedPoster
                     )}
                  </div>
               </div>
            ) : (
               <div
                  ref={containerRef}
                  className='w-full overflow-hidden rounded-lg'
                  style={{ position: 'relative', aspectRatio: item.aspectRatio }}
               >
                  {showEmbed ? (
                     <>
                        {thumbnailOverlay}
                        <iframe
                           ref={iframeRef}
                           className='h-full w-full rounded-lg'
                           src={item.embedUrl}
                           title={item.title}
                        />
                        {fullscreenButton}
                     </>
                  ) : (
                     embedPoster
                  )}
               </div>
            )
         ) : isPortrait ? (
            <div className='flex justify-center'>
               <PhotoProvider>
                  <PhotoView src={item.image}>
                     <img
                        className='rounded-lg object-contain cursor-pointer'
                        style={{
                           height: 'min(86vh, 90vw / ' + item.aspectRatio + ')',
                           width: `min(90vw, min(86vh, 90vw / ${item.aspectRatio}) * ${item.aspectRatio})`,
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
         <ItemMeta
            item={item}
            showViewButton={!!item.embedUrl}
            embedActive={showEmbed}
            onView={() => setShowEmbed(true)}
            onClose={() => setShowEmbed(false)}
         />
      </div>
   )
}
