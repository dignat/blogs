import type { GetStaticProps, GetStaticPaths } from "next"
import type { Article } from "@/data/articles";
import {useRouter} from 'next/router';
import { getSinglePost, renderMarkdown } from "@/utils/md";
import styles from '@/styles/Article.module.css';
import ScrollToTop from "@/components/ScrollToTop";
import articles from "@/data/articles";

type Props = {
    article: Article,
    content: string
}
export const getStaticPaths: GetStaticPaths = () => {
    const paths = articles.map((article: Article) => {
        return {
            params: {article: article.slug}
        }
    });
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const slugParam = context.params?.['article'] as string;
    const res = await fetch(`https://blogs-black-one.vercel.app/api/articles/${slugParam}`);
    const data = await res.json();
    
    const content = await (getSinglePost(slugParam, '/blogs'))
    const renderHtml = await renderMarkdown(content.content);

    return {
        props: {
           article: data,
           content: renderHtml
        }
    }

}

const Article = ({article, content}: Props) => {
    const router = useRouter();
    const date = new Date(article.created).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const getReadingTime = () => {
        const secondTreshold = 500;
        const numWords = content.trim().split(/\s+/).length;
        const decimalPoints = (numWords/200).toFixed(3).split('.');
        const seconds = ((Number(decimalPoints[1])) * 0.60);
        const minutes = Number(decimalPoints[0]);
        const readingResult = seconds > secondTreshold ? (minutes+1) : minutes;
        return readingResult;
    }
    
    return ( 
        <>
        <ScrollToTop scrollY={400}/>
         <div className={styles.content}>
            <span className={styles['meta-span-link']} onClick={() => router.push('/articles')}>&#x2190; Go back to Articles</span>
            <h1 className={styles['post-title']}>{article.title}</h1>
            <p className={styles['post-subtitle']}>
                <span>{date}</span>
                <span className={styles['meta-separator']}>&#x2022;</span>
                {getReadingTime()} min read
            </p>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: content }}/>
        </div>
        </>
       
        
     );
}
 
export default Article;