import { WorkItem } from "@/lib/definitions";
import ItemTags from "./item-tags";
import ExtraMediaGrid from "./extra-media-grid";

export default function ItemMeta({ item }: { item: WorkItem }) {
    return (
       <div className='flex flex-col gap-6 border-none text-foreground/80'>
          <div className='flex flex-row p-4 pt-8 justify-between items-center'>
             <div className='max-w-[70%]'>
                <p className='text-2xl lg:text-3xl font-semibold'>{item.description}</p>
                <p className='text-sm lg:text-md'>{item.info}</p>
             </div>
             <ItemTags item={item} />
          </div>
 
          <ExtraMediaGrid item={item} />
          {/* <div className='flex justify-end'>
             {item.details && <p className='xl:max-w-[45%] text-end text-lg'>{item.details}</p>}
          </div> */}
       </div>
    )
 }