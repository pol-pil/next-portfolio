'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
   const router = useRouter()
   const [isLeaving, setIsLeaving] = useState(false)

   useEffect(() => {
      const leaveTimer = setTimeout(() => setIsLeaving(true), 900)
      const redirectTimer = setTimeout(() => router.replace('/works'), 1200)

      return () => {
         clearTimeout(leaveTimer)
         clearTimeout(redirectTimer)
      }
   }, [router])

   return (
      <AnimatePresence>
         {!isLeaving && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className='fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background text-foreground'
            >
               <motion.img
                  src='/icon.svg'
                  alt='Logo'
                  className='size-10 brightness-0 dark:invert'
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
               />
               <p className='text-sm text-muted-foreground'>Homepage coming soon…</p>
            </motion.div>
         )}
      </AnimatePresence>
   )
}