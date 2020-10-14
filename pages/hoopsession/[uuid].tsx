import axios from 'axios'
import Head from 'next/head';
import React from 'react';
import {HoopSessionSection} from '../../components/section/HoopSessionSection';
import {Layout} from '../../components/layout/Layout';


// @ts-ignore
function HoopSession({hoopSession}) {
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
