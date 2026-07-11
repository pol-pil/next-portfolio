import { WorkItem } from "@/lib/definitions"
import { useState } from "react"
import { createPortal } from "react-dom"
import { PhotoProvider, PhotoView } from "react-photo-view"

export default function ExtraMediaGrid({ item }: { item: WorkItem }) {
   const [openVideo, setOpenVideo] = useState<string | null>(null)

   if (!item.extra || item.extra.length === 0) return null

   return (
      <>
         <PhotoProvider>
            <div className='flex flex-row flex-wrap gap-2 pb-24 cursor-pointer'>
               {item.extra.map((src, index) => {
                  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src)

                  if (isVideo) {
                     return (
                        <div
                           key={src}
                           onClick={() => setOpenVideo(src)}
                           className='w-full flex-1 min-w-35 h-[12em] shadow-md rounded-md overflow-hidden cursor-pointer'
                        >
                           <video src={src} muted className='h-full w-full object-cover' />
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

         {openVideo &&
            typeof document !== 'undefined' &&
            createPortal(
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
               </div>,
               document.body
            )}
      </>
   )
}