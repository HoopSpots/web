import {useRouter} from 'next/router';
import React, {useContext} from 'react';
import UserContext from '../components/context/UserContext';
import Head from 'next/head';
import {Layout} from '../components/layout/Layout';
import RegisterForm from '../components/form/RegisterForm';

function Register() {
    const router = useRouter();
    const { user } = useContext(UserContext);


    if (user) {
        router.push('/');
    }

    return (
        <div>
            <Head>
                <title>Hoop Spots: Register</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Hoop Spots: Register" key="title"/>
                <meta property="og:description" content="Sign up for a Hoop Spots account. Email. Password. Forgot your password? Stay signed in for a week." key="description"/>
            </Head>
            <Layout>
                <RegisterForm/>
            </Layout>
        </div>
    );
}

export default Register;
