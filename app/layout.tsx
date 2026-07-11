import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { TooltipProvider } from '@/components/ui/tooltip'

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
   description: 'A portfolio website for John Paul Pilar, a Designer and Developer.',
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
               {children}
               </TooltipProvider>
            </ThemeProvider>
         </body>
      </html>
   )
}
