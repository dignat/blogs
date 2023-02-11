import type { Tutorial } from "@/data/tutorials";
import { GetServerSideProps } from "next";
import { getSinglePost, renderMarkdown } from "@/utils/md";
import styles from '@/styles/Article.module.css';
import {useRouter} from 'next/router';
import ScrollToTop from "@/components/ScrollToTop";

type Props = {
    tutorial: Tutorial,
    content: string
}

const host = "https://blogs-black-one.vercel.app/";

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const slug = context.params?.['tutorial'] as string;
    const res = await fetch(`${host}/api/articles/${slug}`);
    const data = await res.json();
    const content = await getSinglePost(slug, '/tutorials');
    const renderHtml = await renderMarkdown(content.content)
    return {
        props: {
            tutorial: data,
            content: renderHtml
        }

    }
}
const Tutorial = ({tutorial, content}: Props) => {
    const router = useRouter();
    return (
        <>
        <ScrollToTop scrollY={400}/>
        <div className={styles.content}>
            <span className={styles['meta-span-link']} onClick={() => router.push('/tutorials')}>&#x2190; Go back to Tutorials</span>
            <h1  className={styles['post-title']}>{tutorial.title}</h1>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: content }}></div>
        </div>
        
        </>
        
    )
}

export default Tutorial;