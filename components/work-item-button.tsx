import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { WorkItem } from "@/lib/definitions"
import { TextRoll } from "./ui/skiper-ui/skiper58"

export default function WorkItemButton({
    item,
    isSelected,
    onSelect,
 }: {
    item: WorkItem
    isSelected: boolean
    onSelect: (item: WorkItem) => void
 }) {
    const [isHovered, setIsHovered] = useState(false)
 
    return (
       <Button
          type='button'
          variant='ghost'
          className={cn(
             'group relative w-full h-14 overflow-hidden rounded-lg p-0 border-0 cursor-pointer',
             isSelected && 'shadow-2xl'
          )}
          aria-pressed={isSelected}
          onClick={() => onSelect(item)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
       >
          <img className={cn('absolute grayscale inset-0 h-full w-full object-cover', isSelected && 'grayscale-0', isHovered && 'grayscale-0')} src={item.image} alt={item.alt} />
 
          {/* Overlay: invisible by default, darkens on hover */}
          <div
             className={cn(
                'absolute inset-0 bg-white dark:bg-black transition-opacity duration-500',
                isHovered ? 'opacity-80' : 'opacity-86',
                isSelected && 'opacity-40 bg-black'
             )}
          />
 
          {/* Text: hidden by default, fades in on hover */}
          <div
             className={cn(
                'relative z-10 flex h-full w-full items-center justify-center px-2 transition-opacity duration-500 dark:text-white text-black',
                isHovered ? 'opacity-100' : 'opacity-40 lg:opacity-0',
                isSelected && 'opacity-100'
             )}
          >
             {item.icon ? (
                <img
                   src={item.icon}
                   className={cn('absolute inset-0 m-auto size-38 brightness-0 dark:invert', isSelected && 'invert')}
                />
             ) : (
                <TextRoll
                   animate={isHovered ? 'hovered' : 'initial'}
                   className={cn('font-medium text-xl uppercase', isSelected && 'text-white')}
                >
                   {item.title}
                </TextRoll>
             )}
          </div>
       </Button>
    )
 }