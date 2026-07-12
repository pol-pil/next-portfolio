'use client'

import Dock from '@/components/Dock'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
   const router = useRouter()
   const [isMobile, setIsMobile] = useState(false)
   const [isActive, setIsActive] = useState(false)
   const [isImageVisible, setIsImageVisible] = useState(true)
   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
   const imageRef = useRef<HTMLImageElement>(null)

   useEffect(() => {
      const checkSize = () => setIsMobile(window.innerWidth < 1024)
      checkSize()
      window.addEventListener('resize', checkSize)
      return () => window.removeEventListener('resize', checkSize)
   }, [])

   // Track whether the polp1 image is currently in the viewport
   useEffect(() => {
      const node = imageRef.current
      if (!node) return

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsImageVisible(entry.isIntersecting)
         },
         { threshold: 0 } // fires as soon as even 1px is visible/hidden
      )

      observer.observe(node)
      return () => observer.disconnect()
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
         onClick: () => router.push('/works'),
      },
      {
         icon: <ModeToggle />,
         label: 'Theme',
         className: 'rounded-full shadow-none',
         isTransparent: true,
         isActive: false,
         onClick: () => {},
      },
      ...(isMobile && !isActive && !isImageVisible
         ? [
              {
                 icon: (
                    <Avatar className='size-10'>
                       <AvatarImage src='/polp1.avif' alt='John Paul Pilar' />
                    </Avatar>
                 ),
                 label: 'Contact',
                 isTransparent: true,
                 className: 'rounded-full ml-14 border-none shadow-none',
                 isActive: false,
                 onClick: () => {
                    window.open('https://www.linkedin.com/in/johnpaulpilar/', '_blank', 'noopener,noreferrer')
                 },
              },
           ]
         : []),
   ]

   const handleClick = () => {
      setIsActive(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
         setIsActive(false)
      }, 1000)
   }

   return (
      <div className=''>
         <Dock
            items={tabs}
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />
         <div className='relative flex flex-1 h-dvh justify-center items-center overflow-hidden'>
            <img
               src='/iconstar.svg'
               alt=''
               aria-hidden='true'
               className='absolute top-[8%] left-0 -translate-x-1/2
               lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:-translate-x-1/2
               w-[clamp(20rem,30vw,35.75rem)] h-auto
               brightness-0 dark:invert pointer-events-none z-0'
            />
            <img
               src='/iconcode.svg'
               alt=''
               aria-hidden='true'
               className='absolute bottom-[8%] right-0 translate-x-[52%]
             lg:top-1/2 lg:-translate-y-1/2 lg:right-0
             w-[clamp(20rem,30vw,35.75rem)] h-auto
             brightness-0 dark:invert pointer-events-none z-0'
            />
            <div className='flex flex-row items-center lg:gap-2'>
               <p className='relative z-10 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold text-nowrap text-center px-4'>
                  Designer
               </p>
               <img
                  ref={imageRef}
                  src='/polp1.avif'
                  alt=''
                  onClick={handleClick}
                  className={`rounded-full transition-all hover:size-18 duration-300 cursor-pointer ${
                     isActive ? 'size-18' : 'size-4'
                  }`}
               />
               <p className='relative z-10 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold text-nowrap text-center px-4'>
                  Developer
               </p>
            </div>
         </div>
         <div className='flex h-300 items-center justify-center text-4xl'>
                  Hello freind. Hello friend
         </div>
      </div>
   )
}
