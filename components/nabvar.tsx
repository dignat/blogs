import Link from 'next/link';
import styles from '../styles/Home.module.css';
const Navbar = () => {
    return ( 
        <nav className={styles.nav}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/articles">Articles</Link></li>
                <li><Link href="/poetry">Poetry</Link></li>
                <li><Link href="/stories">Short stories</Link></li>
            </ul> 
        </nav>
     );
}
 
export default Navbar;