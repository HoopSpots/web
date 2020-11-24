import axios from 'axios'
import Head from 'next/head';
import React from 'react';
import {Layout} from '../../components/layout/Layout';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import HoopSessionPage from '../../components/pages/HoopSessionPage';

type HoopSessionProps = {
    hoopSession: HoopSession
}
dayjs.extend(localizedFormat);

// @ts-ignore
function HoopSession({hoopSession}: HoopSessionProps) {
    const title = `${hoopSession.hoop_spot?.name} | Hoop Spots`;
    const description = `Come to ${hoopSession.hoop_spot?.name} and play pickup basketball at ${dayjs(hoopSession.start_time).format('LT')} on ${dayjs(hoopSession.start_time).format('ll')}.`;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title} key="og-title"/>
                <meta name='twitter:title' content={title} key="twitter-title"/>
                <meta property="description" content={description} key="description"/>
                <meta property="og:description" content={description} key="og-description"/>
                <meta property="og:image" content={hoopSession.hoop_spot?.image} key="og-image"/>
                <meta property="twitter:image" content={hoopSession.hoop_spot?.image} key="twitter-image"/>
                <meta property='og:site_name' content="Hoop Spots" key="og-sitename"/>
            </Head>
            <Layout>
                <HoopSessionPage hoopSession={hoopSession}/>
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
