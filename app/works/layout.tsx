export default async function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className='h-dvh w-full'>
         <div className='relative h-full'>{children}</div>
      </div>
   )
}
