import Head from 'next/head'
import {Header} from '../components/header/Header.';
import {LandingHero} from '../components/section/LandingHero.';


export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header isLoggedIn={false}/>
            <LandingHero/>
        </div>
    )
}
