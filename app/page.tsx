import ImageTrail from '@/components/image-trail'
import { ResizableMain } from '@/components/resizable-main'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { TooltipProvider } from '@/components/ui/tooltip'

function Home() {
   return (
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
         <Analytics />
         <div className='h-dvh w-full pt-4 px-2 sm:px-8 xl:px-36'>
            {/* ImageTrail behind everything */}
            <div className='fixed inset-0 z-0'>
               <ImageTrail
                  key='image-trail'
                  items={['/cleanrot7.avif', '/vp1.avif', '/juliana.avif', '/jane9.avif', '/resto.avif']}
                  variant={1}
               />
            </div>

            {/* ResizableMain on top */}
            <div className='relative z-10 h-full'>
               <TooltipProvider>
                  <ResizableMain />
               </TooltipProvider>
            </div>
         </div>
      </ThemeProvider>
   )
}
export default Home
