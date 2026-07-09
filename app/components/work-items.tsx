import {
   SiAngular,
   SiClerk,
   SiConvex,
   SiExpo,
   SiFigma,
   SiGooglemaps,
   SiIonic,
   SiLaravel,
   SiMysql,
   SiReact,
   SiShadcnui,
   SiTailwindcss,
   SiTypescript,
} from '@icons-pack/react-simple-icons'

export type SectionId = 'visuals' | 'projects'

export type WorkItem = {
   id: string
   section: SectionId
   category: string
   title: string
   image: string
   video?: string
   thumbnail?: string
   alt: string
   description: string
   info?: string
   details?: string
   embedUrl?: string
   additional?: string
   tags: Array<{
      label: string
      icon: React.FC<React.SVGProps<SVGSVGElement>>
   }>
   aspectRatio: number
   extra?: string[]
   icon?: string
}

const PhotoshopIcon = () => <p className='font-semibold text-xl'>Ps</p>

export const sections: Array<{ id: SectionId; label: string }> = [
   { id: 'visuals', label: 'Visuals' },
   { id: 'projects', label: 'Projects' },
]

export const workItems: WorkItem[] = [
   {
      id: 'artsphere-layout',
      section: 'visuals',
      category: 'Layouts',
      title: 'ArtSphere',
      image: '/asm.avif',
      thumbnail: '/artspherepreview.avif',
      alt: 'The ArtSphere thumbnail',
      description: 'The ArtSphere',
      info: 'Web Design · School Project · 2024',
      details:
         'ArtSphere embodies a modern digital sanctuary for art, where minimalism allows creativity to take center stage. The contrast of black and white reflects both clarity and mystery, while subtle glows hint at the quiet aura of a gallery space. Every element is pared down to essentials—deliberate, restrained, and timeless—so that the design itself feels like an extension of the artworks it seeks to frame.',
      embedUrl:
         'https://embed.figma.com/proto/zR7MV8n7ismhZS2bup8sMq/Virtual-Tour-App-for-Art-Gallery--Copy-?node-id=660-113&page-id=0%3A1&starting-point-node-id=660%3A113&scaling=scale-down-width&content-scaling=fixed&embed-host=share&hide-ui=1',
      tags: [{ label: 'Figma', icon: SiFigma }],
      aspectRatio: 16 / 10.4,
      extra: ['asp1.avif', 'asp2.avif', 'asp3.avif', 'asp4.avif'],
      icon: '/artsphere.svg',
   },
   {
      id: 'slicehaus-layout',
      section: 'visuals',
      category: 'Layouts',
      title: 'Slicehaus',
      image: '/shm.avif',
      thumbnail: '/slicehauspreview.avif',
      alt: 'Slicehaus logo',
      description: 'Slicehaus',
      info: 'Brand Identity · School Project · 2025',
      embedUrl:
         'https://embed.figma.com/proto/xuQnWFXgDs1Ilym2SvqmIl/Slicehaus--Community-?node-id=2003-22266&p=f&viewport=-144%2C-189%2C0.02&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2003%3A22266&page-id=0%3A1&embed-host=share&hide-ui=1',
      tags: [{ label: 'Figma', icon: SiFigma },
         { label: 'Photoshop', icon: PhotoshopIcon },
      ],
      aspectRatio: 16 / 10.4,
      extra: ['shp1.avif', 'shp2.avif', 'shp3.avif', 'shp4.avif', 'shp5.avif'],
      icon: '/slicehaus.svg',
   },
   {
      id: 'bondbook-layout',
      section: 'visuals',
      category: 'Layouts',
      title: 'BondBook',
      image: '/bbm.avif',
      thumbnail: '/bbp1.avif',
      alt: 'BondBook layout thumbnail',
      description: 'BondBook',
      info: 'Mobile App Design · School Project · 2024',
      embedUrl:
         'https://embed.figma.com/proto/QuentdTLxdNzwYDaEI2AL6/Pilar--John-Paul?node-id=437-316&p=f&viewport=473%2C-79%2C0.09&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=437%3A316&page-id=0%3A1&show-proto-sidebar=1&embed-host=share&hide-ui=1', // 'https://embed.figma.com/proto/QuentdTLxdNzwYDaEI2AL6/Pilar--John-Paul?node-id=943-2646&p=f&viewport=473%2C-79%2C0.09&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=943%3A2619&page-id=0%3A1&embed-host=share&hide-ui=1',
      tags: [{ label: 'Figma', icon: SiFigma }],
      aspectRatio: 9 / 18.4,
      extra: ['/bbp1.avif', '/bbp2.avif', '/bbp3.avif', '/bbp4.avif', '/bbp5.avif', 'bbp6.avif'],
      icon: '/bondbook.svg',
   },
   {
      id: 'varre-poster',
      section: 'visuals',
      category: 'Posters',
      title: 'Varre',
      image: '/whosbehindthemask.avif',
      alt: 'Varre poster thumbnail',
      description: "Who's Behind the Mask",
      info: 'School Project · 2024',
      tags: [
         { label: 'Figma', icon: SiFigma },
         { label: 'Photoshop', icon: PhotoshopIcon },
      ],
      aspectRatio: 4 / 5,
      extra: ['vp1.avif', 'varre.gif', 'vp2.avif'],
   },
   {
      id: 'catholic-poster',
      section: 'visuals',
      category: 'Posters',
      title: 'Religion',
      image: '/catholic.avif',
      alt: 'Religion poster thumbnail',
      description: 'Religion',
      info: 'School Project · 2024',
      tags: [{ label: 'Figma', icon: SiFigma }],
      aspectRatio: 3 / 4,
      extra: ['cp1.avif'],
   },
   {
      id: 'technoday-poster',
      section: 'visuals',
      category: 'Posters',
      title: 'Technoday',
      image: '/technoday.avif',
      alt: 'Technoday poster thumbnail',
      description: 'Technoday',
      info: 'Event Poster Design · 2025',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 1 / 1.41,
      extra: ['tdp2.avif', 'tdp3.avif', 'tdp1.avif'],   
   },
   {
      id: 'whywait-poster',
      section: 'visuals',
      category: 'Posters',
      title: 'Why Wait?',
      image: '/whywait.avif',
      alt: 'Why Wait poster thumbnail',
      description: 'Why',
      info: 'Quote Poster · 2025',
      tags: [
         { label: 'Figma', icon: SiFigma },
         { label: 'Photoshop', icon: PhotoshopIcon },
      ],
      aspectRatio: 16 / 9,
      extra: ['wp1.avif', 'wp2.avif'],
   },
   {
      id: 'resto-artwork',
      section: 'visuals',
      category: 'Artworks',
      title: 'Resto',
      image: '/resto.avif',
      alt: 'Resto artwork thumbnail',
      description: 'Resto',
      info: 'Digital Art · 2024',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 16 / 9,
      extra: ['rp1.avif', 'rp2.mp4']
   },
   {
      id: 'jane-artwork',
      section: 'visuals',
      category: 'Artworks',
      title: 'Jane',
      image: '/jane9.avif',
      alt: 'Jane artwork thumbnail',
      description: 'Jane',
      info: 'Digital Art · 2024',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 16 / 9,
      extra: ['jp1.avif', 'jp2.mp4'],
   },
   {
      id: 'mirror-artwork',
      section: 'visuals',
      category: 'Artworks',
      title: 'Mirror',
      image: '/neverhappened.avif',
      alt: 'Mirror artwork thumbnail',
      description: 'Mirror',
      info: 'Digital Art · 2024',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 2 / 3,
      extra: ['nhp1.avif', 'nhp2.avif'],
   },
   {
      id: 'juliana-artwork',
      section: 'visuals',
      category: 'Artworks',
      title: 'Juliana',
      image: '/juliana.avif',
      alt: 'Juliana artwork thumbnail',
      description: 'Juliana',
      info: 'Digital Art · 2024',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 2 / 3,
      extra: ['jlp1.avif', 'jlp2.mp4'],
   },
   {
      id: 'cleanrasdasdot-poster',
      section: 'visuals',
      category: 'Artworks',
      title: 'Cleanrot',
      image: '/cleanrot7.avif',
      alt: 'Cleanrot poster thumbnail',
      description: 'Cleanrot',
      info: 'Digital Art · 2024',
      tags: [{ label: 'Photoshop', icon: PhotoshopIcon }],
      aspectRatio: 9 / 16,
      extra: ['crp1.avif', 'crp2.gif'],
   },
   {
      id: 'eResq-app',
      section: 'projects',
      category: 'Systems',
      title: 'e-ResQ',
      image: '/eresq.avif',
      video: '/eresq.mp4',
      thumbnail: '/eresqsummary.mp4',
      alt: 'e-ResQ System thumbnail',
      description: 'e-ResQ',
      info: 'Best Capstone Project Award - Gold (Web Systems Technology) · 2025',
      tags: [
         { label: 'React & React Native', icon: SiReact },
         { label: 'Tailwind CSS', icon: SiTailwindcss },
         { label: 'Expo', icon: SiExpo },
         { label: 'Convex', icon: SiConvex },
         { label: 'TypeScript', icon: SiTypescript },
         { label: 'Google Maps API', icon: SiGooglemaps },
         { label: 'shadcn/ui', icon: SiShadcnui },
         { label: 'Clerk', icon: SiClerk },
      ],
      aspectRatio: 16 / 9,
      extra: ['eqp1.avif', 'eqp2.avif', 'eqp3.avif', 'eqp4.avif', 'eqp5.avif'],
   },
   {
      id: 'casa-app',
      section: 'projects',
      category: 'Systems',
      title: 'Hotel System',
      image: '/casatmb.avif',
      video: '/casa.mp4',
      thumbnail: '/casapreview.mp4',
      alt: 'Booking System thumbnail',
      description: 'Hotel Management System',
      info: 'On-the-Job Training Project · 2026',
      tags: [
         { label: 'Laravel', icon: SiLaravel },
         { label: 'React', icon: SiReact },
         { label: 'Tailwind CSS', icon: SiTailwindcss },
         { label: 'MySQL', icon: SiMysql },
         { label: 'TypeScript', icon: SiTypescript },
         { label: 'shadcn/ui', icon: SiShadcnui },
      ],
      aspectRatio: 16 / 10,
      extra: ['/hms1.avif', '/hms2.avif', '/hms3.avif', '/hms4.avif', '/hms5.avif', '/hms6.avif'],
   },
   {
      id: 'ipundar-app',
      section: 'projects',
      category: 'Systems',
      title: 'iPundar',
      image: '/ipundar.avif',
      video: '/ipundar.mp4',
      thumbnail: '/ipundar.mp4',
      alt: 'Budgeting System thumbnail',
      description: 'iPundar',
      info: 'Mobile App · School Project · 2024',
      tags: [
         { label: 'Ionic', icon: SiIonic },
         { label: 'Angular', icon: SiAngular },
      ],
      aspectRatio: 9 / 18.5,
      extra: ['/ip1.avif', '/ip2.avif', '/ip3.avif', '/ip4.avif', '/ip5.avif'],
   },
]

export function getDefaultItem(section: SectionId) {
   return workItems.find((item) => item.section === section) ?? workItems[0]
}

export function getItemsByCategory(items: WorkItem[]) {
   return items.reduce<Record<string, WorkItem[]>>((categories, item) => {
      categories[item.category] = [...(categories[item.category] ?? []), item]
      return categories
   }, {})
}
