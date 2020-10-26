import axios from 'axios'
import Head from 'next/head';
import React from 'react';
import HoopSessionSection from '../../components/section/HoopSessionSection';
import {Layout} from '../../components/layout/Layout';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type HoopSessionProps = {
    hoopSession: HoopSession
}
dayjs.extend(localizedFormat);

// @ts-ignore
function HoopSession({hoopSession}: HoopSessionProps) {
    const title = `${hoopSession.hoopspot?.name} | Hoop Spots 🏀📍`;
    const description = `Come to ${hoopSession.hoopspot?.name} and play pickup basketball at ${dayjs(hoopSession.start_time).format('LT')} on ${dayjs(hoopSession.start_time).format('ll')}.`;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property="og:image" content={hoopSession.hoopspot?.image} key="og-image"/>
                <meta property="twitter:image" content={hoopSession.hoopspot?.image} key="twitter-image"/>
                <meta property='og:site_name' content="Hoop Spots 🏀📍" key="og-sitename"/>
            </Head>
            <Layout>
                <HoopSessionSection hoopSession={hoopSession}/>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hoopsession/${context.params.uuid}`);
    let hoopSession: HoopSession = res.data.data;

    return {
        props: {
            hoopSession
        },
    }
}


export default HoopSession;
