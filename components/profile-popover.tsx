import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { cn } from '@/lib/utils'

export default function ProfilePopover({
   user = {
      username: 'pol.plr',
      name: 'Paul Pilar',
      avatar: '/polp1.avif',
      posts: 11,
      followers: 3,
      bio: 'Building things on the internet 🛠️ · Manila, PH',
   },
}) {
   const [open, setOpen] = useState(false)

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger>
            <Avatar className={cn('size-6 cursor-pointer ring-2 ring-blue-500 transition-all', open && 'ring-0')}>
               <AvatarImage src={user.avatar} alt={user.name} />
               <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
         </PopoverTrigger>

         <PopoverContent
            align='center'
            className='w-72 p-0 mb-5 lg:mb-6 overflow-hidden rounded-xl border-black/10 dark:border-white/10 bg-white dark:bg-zinc-800/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
         >
            <div className='flex items-center justify-between px-4 pt-4'>
               <div className='flex items-center gap-3'>
                  <Avatar className='size-14 ring-1 ring-black/5'>
                     <AvatarImage src={user.avatar} alt={user.name} />
                     <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className='min-w-0'>
                     <p className='truncate text-sm font-semibold'>{user.username}</p>
                     <p className='truncate text-sm text-muted-foreground'>{user.name}</p>
                  </div>
               </div>
               <ModeToggle className='mr-1' />
            </div>

            <div
               onClick={() => (window.location.href = '/works')}
               className='flex items-center justify-between border-t border-white/10 px-4 pt-3 text-center cursor-pointer'
            >
               <Stat label='Designs' value={user.posts} />
               <Stat label='Projects' value={user.followers} />
            </div>

            {/* {user.bio && <p className='px-4 pb-3 text-sm leading-snug text-muted-foreground'>{user.bio}</p>} */}

            <div className='flex gap-2 border-t border-white/10 p-3'>
               <Button
                  onClick={() => {
                     window.open('https://www.linkedin.com/in/johnpaulpilar/', '_blank', 'noopener,noreferrer')
                  }}
                  className='flex-1 rounded-lg py-1.5 text-sm font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
               >
                  LinkedIn
               </Button>
               <Button
                  onClick={() => {
                     window.location.href = 'mailto:pilarjohnpaul.work@gmail.com'
                  }}
                  className='flex-1 rounded-lg bg-neutral-100 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 cursor-pointer'
               >
                  Message
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   )
}

function Stat({ label, value }: { label: string; value: string | number }) {
   return (
      <div className='flex flex-1 flex-col'>
         <span className='text-sm font-semibold'>{value}</span>
         <span className='text-xs text-muted-foreground'>{label}</span>
      </div>
   )
}
