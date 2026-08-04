import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SelectionProvider } from '@/context/selection-context'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
})

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
})

export const metadata: Metadata = {
   title: 'Paul Pilar',
   description:
      'Portfolio website of John Paul Pilar, featuring UI/UX design, frontend development, and creative projects.',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html
         lang='en'
         className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans')}
         suppressHydrationWarning
      >
         <body className='min-h-full flex flex-col'>
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
               <TooltipProvider>
                  <Analytics />
                  <SelectionProvider>{children}</SelectionProvider>
               </TooltipProvider>
            </ThemeProvider>
         </body>
      </html>
   )
}
