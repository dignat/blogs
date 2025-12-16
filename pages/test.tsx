import Search from '@/components/Search';
import articles, { Article } from '@/data/articles';
import styles from '@/styles/Article.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Suspense } from 'react';



function SearchBarFallback() {
  return <>placeholder</>
}
export default function Table() {

    const params = useSearchParams();
    const query = params.get('query')
    console.log(query, 'query in test')
    if (query) {
     const data = articles.filter((article) => article.slug.includes(query?.toLowerCase()))
     console.log(data, 'data in test')
    }
   
    return (
        <div>
            <div className={styles['article-search']}>
                <Suspense fallback = {<SearchBarFallback/>}>
                <Search placeholder="Search article...."/>
                </Suspense>
            </div>           
        </div>
    )
}