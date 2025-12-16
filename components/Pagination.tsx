import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';

export default function Pagination({totalPages}: {totalPages: number}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const url = createPageURL(currentPage - 1);
      router.push(url);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const url = createPageURL(currentPage + 1);
      router.push(url);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage <= 1}
        onClick={goToPreviousPage}
        style={{
          opacity: currentPage <= 1 ? 0.5 : 1,
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </button>
      <span className={styles.paginationInfo}>Page {currentPage} of {totalPages}</span>
      <button
        className={styles.paginationButton}
        disabled={currentPage >= totalPages}
        onClick={goToNextPage}
        style={{
          opacity: currentPage >= totalPages ? 0.5 : 1,
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );

}