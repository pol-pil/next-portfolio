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
   const [scrollProgress, setScrollProgress] = useState(0)
   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
   const imageRef = useRef<HTMLImageElement>(null)

   useEffect(() => {
      const checkSize = () => setIsMobile(window.innerWidth < 1024)
      checkSize()
      window.addEventListener('resize', checkSize)
      return () => window.removeEventListener('resize', checkSize)
   }, [])

   useEffect(() => {
      let rafId: number | null = null
      const updateProgress = () => {
         rafId = null
         const heroHeight = window.innerHeight || 1
         const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1)
         setScrollProgress(progress)
      }
      const onScroll = () => {
         if (rafId === null) rafId = requestAnimationFrame(updateProgress)
      }
      updateProgress()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
         window.removeEventListener('scroll', onScroll)
         if (rafId !== null) cancelAnimationFrame(rafId)
      }
   }, [])

   useEffect(() => {
      const node = imageRef.current
      if (!node) return
      const observer = new IntersectionObserver(([entry]) => setIsImageVisible(entry.isIntersecting), { threshold: 0 })
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
      ...(!isActive && !isImageVisible
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
      timeoutRef.current = setTimeout(() => setIsActive(false), 1000)
   }

   const textPhase = Math.min(Math.max(scrollProgress / 0.4, 0), 1)
   const iconPhase = Math.min(Math.max(scrollProgress / 0.7, 0), 10)
   const textTranslateY = textPhase * -0
   const textOpacity = 1 - textPhase
   const travel = iconPhase * 45
   const scale = 1 - iconPhase * 0.8

   const iconstarTransform = isMobile
      ? `translateX(calc(-50% + ${travel}vw)) scale(${scale})`
      : `translate(calc(-50% + ${travel}vw), -50%) scale(${scale})`

   const iconcodeTransform = isMobile
      ? `translateX(calc(52% - ${travel}vw)) scale(${scale})`
      : `translate(calc(0% - ${travel}vw), -50%) scale(${scale})`

   return (
      <div className='relative'>
         {/* Animated gradient backdrop — dark mode only */}
         <div
            aria-hidden='true'
            className='fixed inset-0 -z-20 opacity-0 dark:opacity-100 transition-opacity duration-700'
            style={{
               background: 'linear-gradient(120deg, #000000 0%, #0e0d12 50%, #000000 100%)',
               backgroundSize: '200% 200%',
               animation: 'gradientDrift 16s ease infinite',
            }}
         />

         <style>{`
         @keyframes gradientDrift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
         }
         `}</style>

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
               style={{ transform: iconstarTransform, willChange: 'transform', opacity: textOpacity }}
               className='absolute top-[8%] left-0
               lg:top-1/2 lg:left-0
               w-[clamp(20rem,30vw,35.75rem)] h-auto
               brightness-0 dark:invert pointer-events-none z-0 transition-transform duration-100 ease-out'
            />
            <img
               src='/iconcode.svg'
               alt=''
               aria-hidden='true'
               style={{ transform: iconcodeTransform, willChange: 'transform', opacity: textOpacity }}
               className='absolute bottom-[8%] right-0
             lg:top-1/2 lg:-right-[16%]
             w-[clamp(20rem,30vw,35.75rem)] h-auto
             brightness-0 dark:invert pointer-events-none z-0 transition-transform duration-100 ease-out'
            />
            <div
               className='flex flex-row items-center lg:gap-2'
               style={{
                  transform: `translateY(${textTranslateY}px)`,
                  opacity: textOpacity,
                  willChange: 'transform, opacity',
               }}
            >
               <p className='relative z-10 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold text-nowrap text-center px-4'>
                  Designer
               </p>
               <img
                  ref={imageRef}
                  src='/polp1.avif'
                  alt=''
                  onClick={handleClick}
                  className={`rounded-full border-1 border-black transition-all hover:size-18 duration-300 cursor-pointer ${
                     isActive ? 'size-18' : 'size-4'
                  }`}
               />
               <p className='relative z-10 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold text-nowrap text-center px-4'>
                  Developer
               </p>
            </div>
         </div>
         <div className='flex h-300 items-center justify-center text-4xl'>Hello freind. Hello friend</div>
      </div>
   )
}
