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
                                <h1 className="font-bold tracking-wide text-3xl">Hoop Spots Near You</h1>
                                <div>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <div className="relative flex-grow focus-within:z-10">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                                            </div>
                                            <input id="email" className="form-input block w-full rounded-none rounded-l-md pl-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5" placeholder="Search for spots" />
                                        </div>
                                        <button className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                                            {/* Heroicon name: sort-ascending */}
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                            </svg>
                                            <span className="ml-2">Sort</span>
                                        </button>
                                    </div>
                                </div>
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
