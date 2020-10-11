import axios from 'axios'
import Head from 'next/head';
import React from 'react';
import {Header} from '../../components/header/Header.';
import {HoopSessionHeader} from '../../components/header/HoopSessionHeader';
import {Footer} from '../../components/footer/Footer';
import {MemberList} from '../../components/list/MemberList';


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
            <Header isLoggedIn={false}/>
            <section className="md:py-16 md:my-0 bg-accent">
                <div className="container mx-auto">
                    <HoopSessionHeader hoopSession={hoopSession}/>
                    <img className="w-full h-auto rounded-md mt-2 bg-cover" src={hoopSession.hoopspot?.image}
                         alt="image"/>


                    <div className="w-3/5">
                        <div className="flex justify-between my-4">
                            <h2 className="flex text-2xl font-semibold tracking-wide">Attendees ({hoopSession.members.length})</h2>
                            <a className="flex underline">See all</a>
                        </div>

                        <MemberList members={hoopSession.members}/>
                    </div>
                </div>
            </section>

            <Footer/>
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
