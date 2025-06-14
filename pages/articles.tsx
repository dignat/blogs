import React from "react";
import articles from "@/data/articles";
import Search from "@/components/Search";
import Link from "next/link";
import styles from '../styles/Home.module.css';

const Articles = () => {
    return (
        <>
        <h1 className={styles.sectionTitle}>Articles</h1>
        <div>
            <Search placeholder="Search article"/>
            {articles.map(({id, title, created, shortContent, slug}) => (
                <Link href={`/articles/${slug}`} key={id}>
                <div className={styles.card}>
                
                    <h3>{title}</h3>
                    <small>{new Date(created).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}</small>
                    <div className={styles.divider}></div>
                    <p>{shortContent}</p>
                </div>
                </Link>
            ))}
        </div>

        </> 
        
     );
}
 
export default Articles;