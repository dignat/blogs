import styles from '../styles/Home.module.css';
export default function Search({placeholder}: {placeholder: string}) {
    function handleSearch(term: string) {
        console.log(term);
    }
    return (
       
        <div className={styles.search}>
            <div>
                <label htmlFor="search">Search for stuff</label>
             <input type="search" autoFocus required placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}/>
                <button type="submit">Go</button>    
            </div>
        </div>
    )
}