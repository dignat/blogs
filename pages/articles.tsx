import React from "react";
import type { Article } from "@/data/articles";
import { useState } from "react";
import articles from "@/data/articles";
import Link from "next/link";
import styles from '../styles/Home.module.css';

const Articles = () => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const [selectedTutorial, setSelectedTutorial] = useState<Article>();
    const fetchArticle = async (slug: string) => {
        const apiEndPoint = `${host}/api/articles/${slug}`;
        const res = await fetch(`${apiEndPoint}`);
        const article = await res.json();
        setSelectedTutorial(article);
    }
    return (
        <>
        <h1 className={styles.sectionTitle}>Articles</h1>
        <div>
            {articles.map(({id, title, created, shortContent, slug}) => (
                <div key={id} className={styles.card}>
                <Link href={`/articles/${slug}`} onClick={() => fetchArticle(slug)}>
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
        </div>

        </> 
        
     );
}
 
export default Articles;