import Head from 'next/head'
import {LandingHero} from '../components/section/LandingHero.';
import React from 'react';
import {HoopSpotSlider} from '../components/slider/HoopSpotSlider';
import HoopSessionSlider from '../components/slider/HoopSessionSlider';
import {Layout} from '../components/layout/Layout';

function Home() {
    return (
        <div>
            <Head>
                <title>Hoop Spots 🏀📍</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Hoop Spots 🏀📍" key="title"/>
                <meta property="og:description" content="Hoop Spots allows you to find hoop sessions near you. 🏀📍" key="description"/>
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
