import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import {Layout} from '../../components/layout/Layout';
import {HoopSpotSection} from '../../components/section/HoopSpotSection';

// @ts-ignore
function HoopSpot({ hoopSpot }) {
    return (
        <div>
            <Head>
                <title>Hoop Spots 🏀📍</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Hoop Spots 🏀📍" key="title"/>
                <meta property="og:description" content="Hoop Spots allows you to find hoop sessions near you. 🏀📍"
                      key="description"/>
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
