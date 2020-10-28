import 'tailwindcss/tailwind.css'
import '../styles/slider.css'
import 'notyf/notyf.min.css';
import {AppProps} from 'next/app';
import DatabaseService from '../services/DatabaseService';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import axios from 'axios';
import {LoginResponse} from '../interfaces/responses/LoginResponse';
import {Notyf} from 'notyf';
import {RestService} from '../services/RestService';
import UserContext from '../components/context/UserContext'
import {ResponseFactory} from '../interfaces/ResponseFactory';
import {RegisterRequest} from '../interfaces/requests/RegisterRequest';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
// @ts-ignore
import { init, push } from "@socialgouv/matomo-next";


const App = ({ Component, pageProps }: AppProps) => {
    const [user, setUser] = useState<User|null>(null);
    const [loadedUser, setLoadedUser] = useState<boolean>(false);
    const [initMatomo, setInitMatomo] = useState<boolean>(false);
    const { database } = new DatabaseService();
    const restService = new RestService();
    const router = useRouter();
    const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
    const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

    useEffect(() => {
        if (!loadedUser) {
            database.get('user').then(res => setUser(res)).finally(() => setLoadedUser(true));
        }
    });

    useEffect(() =>{
        if (!initMatomo) {
            init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
            setInitMatomo(true);
        }
    });

    const signIn = (loginRequest: LoginRequest, nextUrl?: string) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, loginRequest)
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await database.set('token', response.token);
                await database.set('user', response.user);
                setUser(response.user);

                // If the query string has a url push the user there. otherwise push them to home
                if (nextUrl) {
                    await router.push(nextUrl);
                } else {
                    await router.push('/');
                }
            }).catch(error => {
                const notyf = new Notyf();
                // Display an error notification
                notyf.error(error.response.data.message);
        })
    };

    const signUp = (registerRequest: RegisterRequest, nextUrl?: string) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, registerRequest)
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await database.set('token', response.token);
                await database.set('user', response.user);
                setUser(response.user);

                // If the query string has a url push the user there. otherwise push them to home
                if (nextUrl) {
                    await router.push(nextUrl);
                } else {
                    await router.push('/');
                }
            }).catch(error => {
            const notyf = new Notyf();
            // Display an error notification
            notyf.error(error.response.data.message);
        });
    };

    const authWithFacebook = (code: string) => {
        let route = `${process.env.NEXT_PUBLIC_API_URL}/facebook/callback`;
        axios.get(route, {params: {code: code}})
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await database.set('token', response.token);
                await database.set('user', response.user);
                setUser(response.user);
            }).catch(error => {
            // Display an error notification and push them back to register or page.
            const notyf = new Notyf();
            // Display an error notification
            notyf.error(error.response.data.message);
            router.push('/login')
        });
    };

    const authWithGoogle = (code: string) => {
        let route = `${process.env.NEXT_PUBLIC_API_URL}/google/callback`;
        axios.get(route, {params: {code: code}})
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await database.set('token', response.token);
                await database.set('user', response.user);
                setUser(response.user);
            }).catch(error => {
            // Display an error notification and push them back to register or page.
            const notyf = new Notyf();
            // Display an error notification
            notyf.error(error.response.data.message);
            router.push('/login')
        });
    };

    const signOut = () => {
        restService.makeHttpRequest(`logout`, `POST`).then(async (res: ResponseFactory<null>) => {
            const notyf = new Notyf();
            notyf.success(res.message);
            router.push('/');
        }).catch(err => console.log(err)).finally(() => {
            setUser(null);
            database.delete('token');
            database.delete('user')
        });
    };

    const updateUser = (user: User) => {
        setUser(user);
        database.set('user', user);
    };

    const userContextData = {
        user: user,
        isAuthenticated: loadedUser ? !!user : undefined,
        updateUser: updateUser,
        signIn: signIn,
        signOut: signOut,
        signUp: signUp,
        authWithFacebook: authWithFacebook,
        authWithGoogle: authWithGoogle
    };

    return (
        <UserContext.Provider value={userContextData}>
            <Component {...pageProps} />
        </UserContext.Provider>
    );
};

export default App;
