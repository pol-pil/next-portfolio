'use client'

type Blob = {
   color: string
   size: string
   left: string
   top: string
   duration: number
}

type MeshGradientProps = {
   colors?: string[]
   background?: string
   blur?: number
   speed?: number
   className?: string
}

const DEFAULT_COLORS = ['#e11d2e', '#7f1d1d', '#000000', '#b91c2c', '#1a0000']

function buildBlobs(colors: string[], speed: number): Blob[] {
   const positions = [
      { left: '5%', top: '10%', size: '55%' },
      { left: '55%', top: '15%', size: '45%' },
      { left: '30%', top: '45%', size: '50%' },
      { left: '60%', top: '50%', size: '40%' },
      { left: '0%', top: '55%', size: '35%' },
   ]

   return colors.map((color, i) => {
      const pos = positions[i % positions.length]
      return {
         color,
         size: pos.size,
         left: pos.left,
         top: pos.top,
         duration: (12 + i * 2) * speed,
      }
   })
}

export default function MeshGradient({
   colors = DEFAULT_COLORS,
   background = '#0a0a0a',
   blur = 60,
   speed = 1,
   className = '',
}: MeshGradientProps) {
   const blobs = buildBlobs(colors, speed)

   return (
      <div
         className={`relative w-full h-full overflow-hidden rounded-xl ${className}`}
         style={{ background }}
      >
         <div className='absolute -inset-[20%]' style={{ filter: `blur(${blur}px)` }}>
            {blobs.map((blob, i) => (
               <div
                  key={i}
                  className='absolute rounded-full'
                  style={{
                     width: blob.size,
                     height: blob.size,
                     left: blob.left,
                     top: blob.top,
                     background: blob.color,
                     transition: 'background .8s ease',
                     animation: `mesh-move-${i % 5} ${blob.duration}s ease-in-out infinite`,
                  }}
               />
            ))}
         </div>

         <style jsx>{`
            @keyframes mesh-move-0 {
               0%, 100% { transform: translate(0, 0) scale(1); }
               33% { transform: translate(15%, 10%) scale(1.15); }
               66% { transform: translate(-10%, 15%) scale(0.9); }
            }
            @keyframes mesh-move-1 {
               0%, 100% { transform: translate(0, 0) scale(1); }
               33% { transform: translate(-15%, 10%) scale(0.85); }
               66% { transform: translate(10%, -10%) scale(1.2); }
            }
            @keyframes mesh-move-2 {
               0%, 100% { transform: translate(0, 0) scale(1); }
               50% { transform: translate(12%, -15%) scale(1.1); }
            }
            @keyframes mesh-move-3 {
               0%, 100% { transform: translate(0, 0) scale(1); }
               33% { transform: translate(-12%, -12%) scale(1.2); }
               66% { transform: translate(8%, 10%) scale(0.9); }
            }
            @keyframes mesh-move-4 {
               0%, 100% { transform: translate(0, 0) scale(1); }
               50% { transform: translate(18%, 8%) scale(1.15); }
            }
         `}</style>
      </div>
   )
}