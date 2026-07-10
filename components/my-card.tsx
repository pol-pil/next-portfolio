import { Avatar, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

export default function MyCard() {
    return (
        <Card className='min-h-43 overflow-hidden group rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-br-[4em] hidden lg:block transition-all duration-500 hover:shadow-[0_0_25px_rgba(115,93,147,0.25)] dark:hover:shadow-[0_0_15px_rgba(115,93,147,0.35)] hover:-translate-y-0.5'>
        <a href='https://www.linkedin.com/in/johnpaulpilar/' target='_blank' rel='noopener noreferrer'>
           <div className='absolute inset-0 bg-gradient-to-br from-[#735D93]/15 dark:from-[#735D93]/20 via-transparent to-transparent bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite] pointer-events-none' />
           <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[300ms] ease-in-out bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent pointer-events-none' />

           <img
              src='/icon.svg'
              alt='Logo'
              className='absolute top-14 left-1 scale-150 opacity-[0.30] dark:opacity-[0.01] transition-all duration-700 ease-out group-hover:opacity-[0.02] animate-[float_6s_ease-in-out_infinite]'
           />

           <div className='flex flex-row gap-4 px-4 -mt-2 items-center'>
              <Avatar className='size-12  transition-transform duration-500 group-hover:scale-105'>
                 <AvatarImage className='rounded-lg' src='/polp1.avif' alt='John Paul Pilar' />
              </Avatar>
              <div className='flex flex-col items-start truncate'>
                 <span className='font-semibold z-1'>John Paul Pilar</span>
                 <span className='text-xs z-1 text-muted-foreground'>Designer/Developer</span>
              </div>
           </div>
        </a>
     </Card>
    )
}