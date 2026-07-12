'use client'

import Dock from '@/components/Dock'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { BriefcaseBusiness, Eye, HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
   const router = useRouter()
   const [isMobile, setIsMobile] = useState(false)

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
         onClick: () => router.push('/works'),
      },
      {
         icon: <ModeToggle />,
         label: 'Theme',
         className: 'rounded-full shadow-none pb-2',
         isTransparent: true,
         isActive: false,
         onClick: () => {},
      },
      ...(isMobile
         ? [
              {
                 icon: (
                    <Avatar className='size-10'>
                       <AvatarImage src='/polp1.avif' alt='John Paul Pilar' />
                    </Avatar>
                 ),
                 label: 'Contact',
                 isTransparent: true,
                 className: 'rounded-full ml-20 border-none shadow-none',
                 isActive: false,
                 onClick: () => {
                    window.open('https://www.linkedin.com/in/johnpaulpilar/', '_blank', 'noopener,noreferrer')
                 },
              },
           ]
         : []),
   ]

   return (
      <div className=''>
         <Dock
            items={tabs}
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300  border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />
<div className="relative flex flex-1 h-dvh justify-center items-center overflow-hidden">
  <img
    src="/iconstar.svg"
    alt=""
    aria-hidden="true"
    className="absolute top-[8%] left-0 -translate-x-1/2
               lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:-translate-x-1/2
               w-[clamp(20rem,30vw,35.75rem)] h-auto
               brightness-0 dark:invert pointer-events-none z-0"
  />
<img
  src="/iconcode.svg"
  alt=""
  aria-hidden="true"
  className="absolute bottom-[8%] right-0 translate-x-[52%]
             lg:top-1/2 lg:-translate-y-1/2 lg:right-0
             w-[clamp(20rem,30vw,35.75rem)] h-auto
             brightness-0 dark:invert pointer-events-none z-0"
/>
  <p className="relative z-10 text-[clamp(1.75rem,6vw,3.75rem)] font-semibold text-nowrap text-center px-4">
    Designer / Developer
  </p>
</div>
         asdasd
      </div>
   )
}
