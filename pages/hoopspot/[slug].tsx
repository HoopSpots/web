import Head from 'next/head';
import React from 'react';
import {Header} from '../../components/header/Header.';
import {HoopSpotHeader} from '../../components/header/HoopSpotHeader';
import axios from 'axios';

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
            <Header isLoggedIn={false}/>
            <section className="md:py-16 md:my-0 bg-accent">
                <div className="container mx-auto">
                    <HoopSpotHeader hoopSpot={hoopSpot}/>

                    <img className="w-full h-auto rounded-md mt-2 bg-cover" src={hoopSpot.image}
                         alt="image"/>

                    <div className="mt-2">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex">
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-xs md:text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    Members
                                </a>
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-xs md:text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    Sessions
                                </a>
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-primary font-medium text-xs md:text-sm leading-5 text-primary focus:outline-none"
                                   aria-current="page">
                                    Ratings
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
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
