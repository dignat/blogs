import React, { Suspense } from "react";
import styles from '@/styles/Home.module.css';
import tutorials from "@/data/tutorials";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import type { Tutorial } from "@/data/tutorials";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

const Tutorials = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ITEMS_PER_PAGE = 2;
    const currentPage = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query');

    // Filter tutorials based on search query
    let filteredTutorials = tutorials;
    if (query && query.trim()) {
        const searchTerm = query.toLowerCase();
        filteredTutorials = tutorials.filter((tutorial) =>
            tutorial.slug.toLowerCase().includes(searchTerm) ||
            tutorial.title.toLowerCase().includes(searchTerm)
        );
    }

    // Calculate pagination values
    const totalPages = Math.ceil(filteredTutorials.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTutorials = filteredTutorials.slice(startIndex, endIndex);

    // Handle edge cases
    React.useEffect(() => {
        if (currentPage < 1 || currentPage > totalPages) {
            // Redirect to first page if invalid page number
            router.push('/tutorials?page=1');
        }
    }, [currentPage, totalPages, router]);

    return (
       <>
        <h1 className={styles.sectionTitle}>Tutorials</h1>
        <div className={styles['article-search']}>
            <Suspense fallback={<>placeholder</>}>
                <Search placeholder="Search tutorials..."/>
            </Suspense>
        </div>
        <div>
            {paginatedTutorials.map(({id, slug, shortContent, title, created}) => (
                <Link href={`/tutorials/${slug}`} key={id}>
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
 
export default Tutorials;