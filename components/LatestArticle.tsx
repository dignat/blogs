import articles from '@/data/articles';
import styles from '../styles/Home.module.css';
import Link from 'next/link';


export default function LatestArticle() {
    const latestArticles = articles.slice(Math.max(articles.length - 2, 0)).reverse();
  return (
        <>
        {latestArticles.map(({id, title, created, shortContent, slug}) => (
            <div key={id} className={styles.card}>
            <Link href={`/articles/${slug}`}>
                <h3>{title}</h3>
                <small>{new Date(created).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</small>
                <div className={styles.divider}></div>
                <p>{shortContent}</p>
            </Link>
            </div>
        ))}
        
        </>
  )
}