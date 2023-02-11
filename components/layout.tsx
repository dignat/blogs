import Navbar from "./nabvar";
import Footer from "./footer";
import type { ReactNode } from "react";
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import clsx from 'clsx';
import useDeviceSize from "./use-device-size";
type Props = {
    children?: ReactNode
}
const Layout = ( { children}: Props) => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openMenu, setOpenMenu] = useState(true);

    const toggleHamburger = () => {
        setMobileMenu(!mobileMenu);
        setOpenMenu(!openMenu);
    }
console.log(openMenu, mobileMenu)
    const createClasses = clsx({
        [styles.container]: true,
        [styles.overlay]: mobileMenu,
        [styles['overlay-open']]: openMenu
    });

    const [width, height] = useDeviceSize();
    const isDesktop = width >= 1200;
    return (
        <>         
            <div className={createClasses}>
                        <div className={styles['hamburger-wrapper']} onClick={toggleHamburger}>
                        <Hamburger isOpen={mobileMenu} isDesktop={isDesktop}/>
                    </div>
                <div className={styles['overlay-content']} onClick={toggleHamburger}>
                {!isDesktop && <Navbar isDesktop={isDesktop} hamburgerOpen={mobileMenu}/>}
                </div>
            </div>
            <div className={styles['blog-main']}>
            { isDesktop && <Navbar isDesktop={isDesktop} hamburgerOpen={mobileMenu}/> }
            { children }
            <Footer/>
            </div> 
        </>
            
        
      );
}
 
export default Layout;