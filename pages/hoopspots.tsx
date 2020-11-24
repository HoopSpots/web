import Head from 'next/head';
import {Layout} from '../components/layout/Layout';
import React from 'react';
import HoopSpotsPage from '../components/pages/HoopSpotsPage';

function HoopSpots() {
    const title = 'Find Locations | Hoop Spots';
    const description = 'Find Hoop Spots within a 50 mile radius of your location.';

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property='og:site_name' content="Hoop Spots" key="og-sitename"/>
            </Head>
            <Layout>
                <HoopSpotsPage/>
            </Layout>
        </div>
    )
}

export default HoopSpots;
