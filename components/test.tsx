import Search from "./Search";
import Pagination from "./Pagination";
import styles from '../styles/Home.module.css';
import { Metadata } from "next";
import Table from "@/pages/test";

export const metadata: Metadata = {
  title: 'Test',
};

export default async function Page(props: {
    searchParams?: {
        query?: string;
        page?: string;

    }
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    console.log(query, 'query from server component')
    const totalPages = 4
    const qTest = 'no idea'
    return (
        <div>
                     <div className={styles['article-search']}>
                                       <Search placeholder="Search article"/>
                                   </div>
           {/* <Table query={query}/> */}
            <Pagination totalPages={totalPages} />
        </div>
    )
}