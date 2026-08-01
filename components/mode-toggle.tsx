import { ThemeToggleButton2 } from '@/components/ui/skiper-ui/skiper4';
import { useThemeToggle } from './ui/skiper-ui/skiper26';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
   const { setCrazyDarkTheme, setCrazyLightTheme } = useThemeToggle({
      variant: 'rectangle',
      start: 'bottom-up',
   })

   const toggleTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      if (isDark) {
         setCrazyLightTheme()
      } else {
         setCrazyDarkTheme()
      }
   }

   return (
      <div onClick={toggleTheme} className='inline-flex'>
         <ThemeToggleButton2 className={cn('size-8 bg-transparent rounded-lg p-2 cursor-pointer', className)} />
      </div>
   )
}