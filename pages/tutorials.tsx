import React from "react";
import styles from '@/styles/Home.module.css';
import tutorials from "@/data/tutorials";
import Link from "next/link";
import { useState } from "react";
import type { Tutorial } from "@/data/tutorials";

const Tutorials = () => {

    return ( 
       <>
        <h1 className={styles.sectionTitle}>Tutorials comming</h1>
        <div>
            {tutorials.map(({id, slug, shortContent, title, created}) => (
                <div key={id} className={styles.card}>
                    <Link href={`/tutorials/${slug}`}>
                        <h3>{title}</h3>
                        <small>{new Date(created).toLocaleDateString('en-US',{day: 'numeric', month: 'long', year: 'numeric'})}</small>
                        <div className={styles.divider}></div>
                        <p>{shortContent}</p>
                    </Link>
                </div>
            ))}
        </div>
       
       </>
    );
}
 
export default Tutorials;