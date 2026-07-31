'use client'

import Dock from '@/components/Dock'
import Heroname from '@/components/heroname'
import ProfilePopover from '@/components/profile-popover'
import { Eye } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
   const router = useRouter()
   const [isMobile, setIsMobile] = useState(false)
   const { theme } = useTheme()
   console.log('current theme:', theme)

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
         icon: <ProfilePopover />,
         label: 'Contact',
         isTransparent: true,
         className: 'rounded-full ml-2 border-none shadow-none',
         isActive: false,
         onClick: () => {},
      },
   ]

   return (
      <div className='relative'>
         <Dock
            items={tabs}
            className={`fixed z-20 dark:border-[1px] border-none shadow-xl text-white transition-all duration-300 border border-black/10 dark:border-white/10 bg-zinc-100/60 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
            panelHeight={isMobile ? 60 : 68}
            baseItemSize={isMobile ? 42 : 50}
            magnification={isMobile ? 44 : 58}
         />
         <div className='flex h-dvh lg:items-end'>
            <div className='w-[80%] lg:w-[60%] m-8 lg:m-20 lg:mb-24'>
               <Heroname mode={theme === 'light' ? 'light' : 'dark'} />
            </div>
         </div>
      </div>
   )
}
