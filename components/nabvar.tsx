import Link from 'next/link';
import styles from '../styles/Home.module.css';
import clsx from 'clsx';
import { useRouter } from 'next/router';
type Props = {
    isDesktop: boolean,
    hamburgerOpen: boolean
}
const Navbar = ({isDesktop, hamburgerOpen}: Props) => {
    const createNavigationClassName = clsx({
        [styles.nav]: isDesktop,
        [styles['nav--mobile']]: !isDesktop,
        [styles['mobile-navigation']]: !isDesktop && hamburgerOpen
    });
    const linkClasses = clsx({
        [styles.active]: isDesktop,
        [styles['active-mobile']]: !isDesktop
    });
    const router = useRouter();
    return ( 
        <>
            <nav className={createNavigationClassName}>
            <ul>
                <li><Link className={router.pathname === "/" ? `${linkClasses}` : ""} href="/">Home</Link></li>
                <li><Link className={router.pathname === "/articles" ? `${linkClasses}` : ""}  href="/articles">Articles</Link></li>
                <li><Link className={router.pathname === "/tutorials" ? `${linkClasses}` : ""} href="/tutorials">Tutorials</Link></li>
                <li><Link className={router.pathname === "/personal" ? `${linkClasses}` : ""}  href="/personal">Personal thoughts</Link></li>
            </ul> 
        </nav>
        </>
        
     );
}
 
export default Navbar;