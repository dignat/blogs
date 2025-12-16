import { useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';
import { debounce } from '../utils/debounce';
import { useEffect, useRef } from 'react';

export default function Search({placeholder}: {placeholder: string}) {
    const router = useRouter();

    // Create a debounced version of the search function
    const debouncedSearch = useRef(
        debounce((term: string) => {
            if (term.trim()) {
                // Check if we're on tutorials page
                const isTutorialsPage = window.location.pathname.includes('/tutorials');
                const targetPath = isTutorialsPage ? '/tutorials' : '/articles';
                router.push(`${targetPath}?query=${encodeURIComponent(term)}&page=1`);
            } else {
                // Check if we're on tutorials page
                const isTutorialsPage = window.location.pathname.includes('/tutorials');
                const targetPath = isTutorialsPage ? '/tutorials' : '/articles';
                router.push(targetPath);
            }
        }, 300) // 300ms debounce delay
    ).current;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const input = form.querySelector('input[type="search"]') as HTMLInputElement;
        if (input && input.value.trim()) {
            // Use the debounced function for form submission too
            debouncedSearch(input.value.trim());
        }
    }

    return (

        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search for stuff</label>
                <input
                    type="search"
                    autoFocus
                    required
                    placeholder={placeholder}
                    onChange={(e) => {
                        // Use debounced search for onChange events
                        debouncedSearch(e.target.value);
                    }}
                />
                <button type="submit"></button>
            </form>
        </div>
    )
}