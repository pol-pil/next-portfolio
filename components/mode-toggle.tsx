import { ThemeToggleButton2 } from '@/components/ui/skiper-ui/skiper4';
import { useThemeToggle } from './ui/skiper-ui/skiper26';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
   const { isDark, toggleTheme } = useThemeToggle({
      variant: 'rectangle',
      start: 'bottom-up',
   })

   return (
      <ThemeToggleButton2
         isDark={isDark}
         onClick={toggleTheme}
         className={cn('size-8 bg-transparent rounded-lg p-2 cursor-pointer', className)}
      />
   )
}
