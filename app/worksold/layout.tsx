import ImageTrail from '@/components/image-trail'

export default async function Layout({children}: {children: React.ReactNode}) {
   return (
      <div className='h-dvh w-full pt-4 px-2 sm:px-8 xl:px-36'>
         <div className='fixed inset-0 z-0'>
            <ImageTrail
               key='image-trail'
               items={['/cleanrot7.avif', '/vp1.avif', '/juliana.avif', '/jane9.avif', '/resto.avif']}
               variant={1}
            />
         </div>

         <div className='relative z-10 h-full'>
            {children}
         </div>
      </div>
   )
}
