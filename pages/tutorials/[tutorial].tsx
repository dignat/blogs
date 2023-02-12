import React from "react";
import type { Tutorial } from "@/data/tutorials";
import { GetStaticPaths, GetStaticProps } from "next";
import tutorials from "@/data/tutorials";
import { getSinglePost, renderMarkdown } from "@/utils/md";
import styles from '@/styles/Article.module.css';
import {useRouter} from 'next/router';
import ScrollToTop from "@/components/ScrollToTop";

type Props = {
    tutorial: string,
    content: string
}

const host = process.env.NEXT_PUBLIC_HOST;
export const getStaticPaths: GetStaticPaths = () => {
    const paths = tutorials.map((tutorial: Tutorial) => {
        return {
            params: {tutorial: tutorial.slug}
        }
    });
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const slug = context.params?.['tutorial'] as string;
    //const res = await fetch(`${host}/api/articles/${slug}`);
    //const data = await res.json();
    const content = await getSinglePost(slug, '/tutorials');
    const renderHtml = await renderMarkdown(content.content)
    return {
        props: {
            tutorial: slug,
            content: renderHtml
        }

    }
}
const Tutorial = ({tutorial, content}: Props) => {
    const router = useRouter();
    const tutorialData = tutorials.find(({slug}) => slug === tutorial);
    if (!tutorialData) return;
    return (
        <>
        <ScrollToTop scrollY={400}/>
        <div className={styles.content}>
            <span className={styles['meta-span-link']} onClick={() => router.push('/tutorials')}>&#x2190; Go back to Tutorials</span>
            <h1  className={styles['post-title']}>{tutorialData.title}</h1>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: content }}></div>
        </div>
        
        </>
        
    )
}

export default Tutorial;