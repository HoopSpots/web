import Head from 'next/head';
import {Layout} from '../components/layout/Layout';
import React from 'react';
import HoopSpotsGrid from '../components/grid/HoopSpotsGrid';

function HoopSpots() {
    const title = 'Find Locations | Hoop Spots 🏀📍';
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
                <meta property='og:site_name' content="Hoop Spots 🏀📍" key="og-sitename"/>
            </Head>
            <Layout>
                <section className="bg-accent h-full py-16">
                    <div className="container mx-auto py-8">
                        <div className="md:max-w-5xl mx-auto px-4">
                            <div className="flex justify-between border-b border-gray-300 mb-5 pb-2 items-center">
                                <h1 className="font-bold tracking-wide text-2xl md:text-3xl">Hoop Spots Near You</h1>
                            </div>
                           <HoopSpotsGrid/>
                        </div>
                    </div>
                </section>
            </Layout>
        </div>
    )
}

export default HoopSpots;
