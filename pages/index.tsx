import Head from 'next/head'
import {LandingHero} from '../components/section/LandingHero.';
import React from 'react';
import {HoopSpotSlider} from '../components/slider/HoopSpotSlider';
import HoopSessionSlider from '../components/slider/HoopSessionSlider';
import {Layout} from '../components/layout/Layout';

function Home() {
    const title = 'Hoop Spots 🏀📍';
    const description = 'Find the best pickup basketball games with the Hoop Spots app. 🏀📍';
    return (
        <div>
            <Head>
                <title>Hoop Spots 🏀📍</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property='og:site_name' content="Hoop Spots 🏀📍" key="og-sitename"/>
            </Head>
            <Layout>
                <LandingHero/>
                <HoopSpotSlider/>
                <HoopSessionSlider/>
            </Layout>
        </div>
    )
}

export default Home;
