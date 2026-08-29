// components/horizontal-scroll.tsx
'use client'

import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

export function HorizontalScroll({
   children,
   className,
}: {
   children: React.ReactNode
   className?: string
}) {
   const wrapperRef = useRef<HTMLDivElement>(null)
   const contentRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (!wrapperRef.current || !contentRef.current) return

      const lenis = new Lenis({
         wrapper: wrapperRef.current,
         content: contentRef.current,
         orientation: 'horizontal',
         gestureOrientation: 'vertical', // lets normal mouse-wheel drive horizontal scroll
         smoothWheel: true,
         wheelMultiplier: 1,
         respectReducedMotion: false,
      })

      let rafId: number
      function raf(time: number) {
         lenis.raf(time)
         rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      return () => {
         cancelAnimationFrame(rafId)
         lenis.destroy()
      }
   }, [])

   return (
      <div
         ref={wrapperRef}
         data-lenis-prevent
         className={`overflow-hidden [&::-webkit-scrollbar]:hidden ${className ?? ''}`}
      >
         <div ref={contentRef} className='flex w-max'>
            {children}
         </div>
      </div>
   )
}