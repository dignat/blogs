export type Tutorial = {
    id: number,
    title: string
    slug: string
    shortContent: string
    created: Date
    updated?: Date
}


const tutorials: Tutorial[] = [
    {
        id: 1,
        title: 'How to Convert Markdown to Html in Next.js',
        slug: 'convert-markdown',
        shortContent: 'How to convert Markdown to Html and style it.',
        created: new Date("March 16 2023")
    }
]

export default tutorials;