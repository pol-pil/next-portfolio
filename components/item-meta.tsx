import { WorkItem } from '@/lib/definitions'
import ItemTags from './item-tags'
import ExtraMediaGrid from './extra-media-grid'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { ArrowUpRight, Eye, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export default function ItemMeta({
   item,
   showViewButton,
   embedActive,
   onView,
   onClose,
}: {
   item: WorkItem
   showViewButton?: boolean
   embedActive?: boolean
   onView?: () => void
   onClose?: () => void
}) {
   return (
      <div className='flex flex-col gap-6 border-none text-foreground/80'>
         <div className='flex flex-row p-4 pt-8 justify-between items-center'>
            <div className='max-w-[70%] flex items-center gap-4'>
               {(item.logo || item.flatlogo) && (
                  <img
                     src={item.flatlogo || item.logo}
                     alt={`${item.title} logo`}
                     className={`size-10 ${item.flatlogo ? 'brightness-0 dark:invert' : ''}`}
                  />
               )}
               <div>
                  <p className='text-2xl lg:text-3xl font-semibold'>{item.description}</p>

                  <div className='text-sm lg:text-md'>
                     {item.certificate ? (
                        <PhotoProvider>
                           <PhotoView src={item.certificate}>
                              <p className='text-sm lg:text-md cursor-pointer underline-offset-4 hover:underline'>
                                 {item.info}
                                 <ArrowUpRight className='inline-block size-4 ml-1 align-middle' />
                              </p>
                           </PhotoView>
                        </PhotoProvider>
                     ) : (
                        <p className='text-sm lg:text-md'>{item.info}</p>
                     )}
                  </div>
               </div>
            </div>
            <div className='flex items-center gap-3'>
               <ItemTags item={item} />
               {showViewButton && (
                  <Tooltip>
                     <TooltipTrigger>
                        <div
                           onClick={embedActive ? onClose : onView}
                           className='flex size-10 lg:size-12 items-center shadow-lg border justify-center rounded-xl cursor-pointer transition-colors bg-zinc-900 dark:bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                        >
                           {embedActive ? (
                              <X className='text-white size-4 lg:size-6' />
                           ) : (
                              <Eye className='text-white size-4 lg:size-6' />
                           )}
                        </div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{embedActive ? 'Close Preview' : 'Live Preview'}</p>
                     </TooltipContent>
                  </Tooltip>
               )}
            </div>
         </div>

         <ExtraMediaGrid item={item} />
      </div>
   )
}
