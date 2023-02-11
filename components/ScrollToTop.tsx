import React from 'react'
import { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import styles from '../styles/Article.module.css';

type Props = {
    scrollY: number
}

export default function ScrollToTop({scrollY}: Props) {
    const [showToButton, setShowToButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollY) {
                setShowToButton(true);
            } else {
                setShowToButton(false);
            }
        })
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <div className={styles['top-to-btm']}>
        {showToButton && (
            <FaAngleUp className={`${styles['icon-position']} ${styles['icon-style']}`} onClick={goToTop}/>
        )}
    </div>
  )
}