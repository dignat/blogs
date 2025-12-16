import React, { useEffect, Suspense } from "react";
import articles from "@/data/articles";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

export default function Articles () {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ITEMS_PER_PAGE = 2;
    const currentPage = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query');

    // Filter articles based on search query
    let filteredArticles = articles;
    if (query && query.trim()) {
        const searchTerm = query.toLowerCase();
        filteredArticles = articles.filter((article) =>
            article.slug.toLowerCase().includes(searchTerm) ||
            article.title.toLowerCase().includes(searchTerm)
        );
    }

    // Calculate pagination values
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    // Handle edge cases
    useEffect(() => {
        if (currentPage < 1 || currentPage > totalPages) {
            // Redirect to first page if invalid page number
            router.push('/articles?page=1');
        }
    }, [currentPage, totalPages, router]);

    return (
        <>
        <h1 className={styles.sectionTitle}>Articles</h1>
        <div className={styles['article-search']}>
            <Suspense fallback={<>placeholder</>}>
                <Search placeholder="Search articles..."/>
            </Suspense>
        </div>
        <div>

             {paginatedArticles.map(({id, title, created, shortContent, slug}) => (
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

        {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </>
     );
}
 