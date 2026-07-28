import { WorkItem } from '@/lib/definitions'
import ItemTags from './item-tags'
import ExtraMediaGrid from './extra-media-grid'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { ArrowUpRight, Eye } from 'lucide-react'

export default function ItemMeta({
   item,
   showViewButton,
   embedActive,
   onView,
}: {
   item: WorkItem
   showViewButton?: boolean
   embedActive?: boolean
   onView?: () => void
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
                  <div className='flex items-center gap-3'>
                     <p className='text-2xl lg:text-3xl font-semibold'>{item.description}</p>
                     {showViewButton && !embedActive && (
                        <button
                           onClick={onView}
                           className='inline-flex items-center gap-1 rounded-full border border-foreground/30 px-3 py-1 text-xs lg:text-sm text-foreground/80 hover:bg-foreground/10 transition-colors shrink-0'
                        >
                           <Eye className='size-3.5' />
                           View
                        </button>
                     )}
                  </div>
                  <div className='text-sm lg:text-md'>
                     {item.certificate ? (
                        <PhotoProvider>
                           <PhotoView src={item.certificate}>
                              <p className='text-sm lg:text-md cursor-pointer inline-flex items-center gap-1 underline-offset-4 hover:underline'>
                                 {item.info}
                                 <ArrowUpRight className='size-4' />
                              </p>
                           </PhotoView>
                        </PhotoProvider>
                     ) : (
                        <p className='text-sm lg:text-md'>{item.info}</p>
                     )}
                  </div>
               </div>
            </div>
            <ItemTags item={item} />
         </div>

         <ExtraMediaGrid item={item} />
      </div>
   )
}