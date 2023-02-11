import styles from '../styles/Home.module.css';
import {AiFillHeart} from 'react-icons/ai';
const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <p>Copyright 2023 | Made with <span><AiFillHeart className={styles['icon-heart']}/></span> by Denise Ignatova</p>
        </footer>
     );
}
 
export default Footer;