import Head from 'next/head';
import React, {useContext} from 'react';
import LoginForm from '../components/form/LoginForm';
import {Layout} from '../components/layout/Layout';
import UserContext from '../components/context/UserContext';
import {useRouter} from 'next/router';

function Login() {
    const router = useRouter();
    const { user } = useContext(UserContext);

    if (user != null) {
        router.push('/');
    }

    return (
        <div>
            <Head>
                <title>Hoop Spots: Login</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Hoop Spots: Login" key="title"/>
                <meta property="og:description" content="Sign in to your account. Email. Password. Forgot your password? Stay signed in for a week." key="description"/>
            </Head>
            <Layout>
                <LoginForm/>
            </Layout>
        </div>
    );
}

export default Login;
