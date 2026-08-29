// components/horizontal-pin-scroll.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export function HorizontalPinScroll({
   fixed,
   children,
   className,
}: {
   fixed?: React.ReactNode
   children: React.ReactNode
   className?: string
}) {
   const wrapperRef = useRef<HTMLDivElement>(null)
   const stickyRef = useRef<HTMLDivElement>(null)
   const trackRef = useRef<HTMLDivElement>(null)
   const [progress, setProgress] = useState(0)
   const [stickyWidth, setStickyWidth] = useState(0)

   useEffect(() => {
      const wrapper = wrapperRef.current
      const sticky = stickyRef.current
      const track = trackRef.current
      if (!wrapper || !sticky || !track) return

      let rafId: number

      function update() {
         const wrapperRect = wrapper!.getBoundingClientRect()
         const stickyHeight = sticky!.offsetHeight
         const scrollable = wrapper!.offsetHeight - stickyHeight
         const raw = -wrapperRect.top / scrollable
         const clamped = Math.min(Math.max(raw, 0), 1)
         setProgress(clamped)
         setStickyWidth(sticky!.offsetWidth)
         rafId = requestAnimationFrame(update)
      }

      rafId = requestAnimationFrame(update)
      return () => cancelAnimationFrame(rafId)
   }, [])

   const trackWidth = trackRef.current?.scrollWidth ?? 0
   const maxTranslate = trackWidth - stickyWidth // existing end-of-scroll pan distance

   // How far off-screen to the right the track should sit at progress = 0.
   // stickyWidth pushes the entire viewport-width's worth of content off the right edge.
   const startOffset = stickyWidth

   // Interpolate from +startOffset (fully off-screen right) down to -maxTranslate (original end position)
   const totalTravel = startOffset + maxTranslate
   const translateX = startOffset - progress * totalTravel

   return (
      <div ref={wrapperRef} className={`relative h-[300dvh] ${className ?? ''}`}>
         <div ref={stickyRef} className='sticky top-0 h-dvh overflow-hidden'>
            {fixed && (
               <div className='absolute inset-0 z-0 flex items-center justify-center pointer-events-none'>
                  {fixed}
               </div>
            )}

            <div
               ref={trackRef}
               className='relative z-10 flex w-max h-full items-center will-change-transform'
               style={{ transform: `translateX(${translateX}px)` }}
            >
               {children}
            </div>
         </div>
      </div>
   )
}