import Head from 'next/head';
import React from 'react';
import {Layout} from '../components/layout/Layout';
import SettingsSection from '../components/section/SettingsSection';

function Settings() {
    const title = 'Hoop Spots | Settings 🏀📍';
    const description = 'Manage your user settings for Hoop Spots. 🏀📍';


    return (
        <div>
            <Head>
                <title>Hoop Spots: Register</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property='og:site_name' content="Hoop Spots 🏀📍" key="og-sitename"/>
            </Head>
            <Layout>
                <SettingsSection/>
            </Layout>
        </div>
    );
}

export default Settings;
