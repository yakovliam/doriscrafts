import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">Doris' Crafts</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/siteindex">
                        ✏️ Explore Crafts ✏️
                    </Link>
                </div>
            </div>
        </header>
    );
}

function ThanksHero() {
    return (
        <div className={clsx('hero shadow--lw', styles.heroBanner)}>
            <div className="container">
                <p className="hero__subtitle">Thank you for visiting!</p>
            </div>
        </div>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Doris' Crafts">
            <HomepageHeader/>
            <main>
                <ThanksHero/>
            </main>
        </Layout>
    );
}
