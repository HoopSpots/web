import Head from 'next/head'
import React from 'react';
import HoopSpotSlider from '../components/slider/HoopSpotSlider';
import HoopSessionSlider from '../components/slider/HoopSessionSlider';
import {Layout} from '../components/layout/Layout';

function Home() {
    const title = 'Hoop Spots';
    const description = 'Find the best pickup basketball games with the Hoop Spots app.';
    return (
        <div>
            <Head>
                <title>Hoop Spots</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property='og:site_name' content="Hoop Spots" key="og-sitename"/>
            </Head>
            <Layout>
                <section className="md:pt-16 md:my-0 bg-accent">
                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:order-last mb-4 md:mb-0">
                            <img className="object-cover object-center"
                                 src="/images/basketball-illustration.svg" alt="basketball illustration"/>
                        </div>
                        <div
                            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                            <h1
                                className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
                                Start Hooping with <br/> <span className="text-primary"> Hoop Spots</span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-gray-700 text-lg sm:text-xl md:mt-5 md:max-w-3xl">
                                Hoop Spots allows you to find hoop sessions near you. Invite your friends to a hoop session
                                and
                                start hooping today!
                            </p>
                            <div className="mt-10 space-x-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="#">
                                        <img src="/images/app-store.png" className="col-span-1 max-h-16"
                                             alt="app store badge"/>
                                    </a>
                                    <a href="#">
                                        <img src="/images/google-play.png" className="col-span-1 max-h-16"
                                             alt="google play badge"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <HoopSpotSlider/>
                <HoopSessionSlider/>
            </Layout>
        </div>
    )
}

export default Home;
