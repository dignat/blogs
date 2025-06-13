export type Article = {
    id: number
    title: string
    slug: string
    shortContent: string
    created: Date
    updated?: Date
}

const articles: Article[] = [
    {
        id: 1,
        title: 'How Autoboxing works in JavaScript',
        slug: 'autoboxing',
        shortContent: 'Autoboxing in Java Script is one of the most fascinating and confusing features. I will try to explain it so I could cement my own knowledge about it.......',
        created: new Date("January 19 2023 10:35")
    },
    {
        id: 2,
        title: 'Solve Props drilling in Vue with Provide and Inject',
        slug: 'provide-inject',
        shortContent: 'Usually when we need to pass data from parent component to a child component we use props........',
        created: new Date("January 18 2023 13:43")
    },
    {
        id: 3,
        title: 'Prototype and access to prototype properties in Java Script.',
        slug: 'prototype',
        shortContent: 'Prototype inheritance and prototype chain are one of the fundametal concepts in Java Script. .......',
        created: new Date("January 19 2023 10:35")
    },
    {
        id: 4,
        title: 'Hard Parts Of Async JS',
        slug: 'hard-parts-of-async-js',
        shortContent: 'Async/Await why do we have them? Why do we need async/await.Demistifying async/await would help writing better code.......',
        created: new Date('December 03 2024 14:00')
    },
    {
        id: 5,
        title: 'Fan-Out Pattern with AWS SQS and Kafka',
        slug: 'fan-out',
        shortContent: 'Fan-out pattern leveraged to enchance microservices and help with refactoring.......',
        created: new Date('June 13 2025 14:54')
    }
]

export default articles;