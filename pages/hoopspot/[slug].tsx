import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import {Layout} from '../../components/layout/Layout';
import {HoopSpotSection} from '../../components/section/HoopSpotSection';

type HoopSpotProps = {
    hoopSpot: HoopSpot
}

// @ts-ignore
function HoopSpot({ hoopSpot }: HoopSpotProps) {
    const title = `${hoopSpot.name} | Hoop Spots 🏀📍`;
    const description = `Join the ${hoopSpot.name} basketball group to find recurring pickup basketball games near ${hoopSpot.city}, ${hoopSpot.state}. `;

    return (
        <div>
            <Head>
                <title>{hoopSpot.name} | Hoop Spots 🏀📍</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property="og:image" content={hoopSpot.image} key="og-image"/>
                <meta property="twitter:image" content={hoopSpot.image} key="twitter-image"/>
                <meta property='og:site_name' content="Hoop Spots 🏀📍" key="og-sitename"/>
            </Head>
            <Layout>
                <HoopSpotSection hoopSpot={hoopSpot}/>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hoopspot/${context.params.slug}`);
    let hoopSpot: HoopSpot = res.data.data;

    return {
        props: {
            hoopSpot
        },
    }
}

export default HoopSpot;
