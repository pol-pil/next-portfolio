import { WorkItem } from "@/lib/definitions"
import { useEffect, useRef, useState } from "react"
import { VideoPopOver } from "./video-popover"
import { Spinner } from "./ui/spinner"
import { Maximize, Minimize } from "lucide-react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import ItemMeta from "./item-meta"

export default function ItemPreview({ item }: { item: WorkItem }) {
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
       <div className='h-full gap-4'>
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
 