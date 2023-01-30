import Navbar from "./nabvar";
import Footer from "./footer";
import type { ReactNode } from "react";
import styles from '../styles/Home.module.css';
type Props = {
    children?: ReactNode
}
const Layout = ( { children}: Props) => {
    return ( 
        <div className={styles['blog-main']}>
        <Navbar/>
        { children }
        <Footer/>
        </div>
      );
}
 
export default Layout;