import { WorkItem } from "@/lib/definitions";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ItemTags({ item }: { item: WorkItem }) {
    return (
       <div className='flex flex-wrap justify-end gap-2'>
          {item.tags.map(({ icon: Icon, label }) => (
             <Tooltip key={label}>
                <TooltipTrigger>
                   <div className='flex size-10 lg:size-12 items-center justify-center rounded-xl border'>
                      <Icon className='size-4 lg:size-6' />
                      {/* <p className='hidden lg:block'>{label}</p> */}
                   </div>
                </TooltipTrigger>
                <TooltipContent>
                   <p>{label}</p>
                </TooltipContent>
             </Tooltip>
          ))}
       </div>
    )
 }