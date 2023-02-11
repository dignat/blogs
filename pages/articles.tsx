import React from "react";
import articles from "@/data/articles";
import Link from "next/link";
import styles from '../styles/Home.module.css';

const Articles = () => {
    return (
        <>
        <h1 className={styles.sectionTitle}>Articles</h1>
        <div>
            {articles.map(({id, title, created, shortContent, slug}) => (
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
        </div>

        </> 
        
     );
}
 
export default Articles;