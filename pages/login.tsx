import Head from 'next/head';
import React from 'react';
import {LoginForm} from '../components/form/LoginForm';
import {Layout} from '../components/layout/Layout';
import {useRouter} from 'next/router';

function Login() {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Hoop Spots: Login</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Hoop Spots: Login" key="title"/>
                <meta property="og:description" content="Sign in to your account. Email. Password. Forgot your password? Stay signed in for a week." key="description"/>
            </Head>
            <Layout>
                <LoginForm router={router}/>
            </Layout>
        </div>
    );
}

export default Login;
