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