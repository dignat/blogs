import type { GetStaticProps, GetStaticPaths } from "next"
import type { Article } from "@/data/articles";
import articles from "@/data/articles";
import { getSinglePost, renderMarkdown } from "@/utils/md";
import styles from '../styles/Article.module.css';

type Props = {
    article: Article,
    content: string
}
const host = process.env.NEXT_PUBLIC_HOST;
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
    const slug = context.params?.['article'] as string;
    const res = await fetch(`${host}/api/articles/${slug}`);
    const data = await res.json();
    const content = await (getSinglePost(slug, '../data/blogs'))
    const renderHtml = await renderMarkdown(content.content)
    return {
        props: {
           article: data,
           content: renderHtml
        }
    }

}
const Article = ({article, content}: Props) => {
    const date = new Date(article.created).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return ( 
        <div className={styles['content-article']}>
        <h1 className={styles['post-title']}>{article.title}</h1>
        <p className={styles['post-subtitle']}>
            <span>{date}</span>
        </p>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: content }}/>
        </div>
        
     );
}
 
export default Article;