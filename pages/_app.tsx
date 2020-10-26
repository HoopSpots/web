import 'tailwindcss/tailwind.css'
import '../styles/slider.css'
import 'notyf/notyf.min.css';
import App from 'next/app';
import DatabaseService, {DBMethods} from '../services/DatabaseService';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import axios from 'axios';
import {LoginResponse} from '../interfaces/responses/LoginResponse';
import {Notyf} from 'notyf';
import {RestService} from '../services/RestService';
import UserContext from '../components/context/UserContext'
import {ResponseFactory} from '../interfaces/ResponseFactory';
import {RegisterRequest} from '../interfaces/requests/RegisterRequest';

export default class MyApp extends App {
    private database: DBMethods;
    private notyf: Notyf;
    private restService: RestService;

    state = {
        user: null
    };

    async componentDidMount(): Promise<void> {
        this.database = (new DatabaseService()).database;
        this.notyf = new Notyf();
        this.restService = new RestService();

        const user = await this.database.get('user');
        this.setState({user})
    }

    signIn = (loginRequest: LoginRequest, nextUrl?: string) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, loginRequest)
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await this.database.set('token', response.token);
                await this.database.set('user', response.user);
                this.setState({user: response.user});

                // If the query string has a url push the user there. otherwise push them to home
                if (nextUrl) {
                    await this.props.router.push(nextUrl);
                } else {
                    await this.props.router.push('/');
                }
            }).catch(error => {
            // Display an error notification
            this.notyf.error(error.response.data.message);
        })
    };

    signUp = (registerRequest: RegisterRequest, nextUrl?: string) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, registerRequest)
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await this.database.set('token', response.token);
                await this.database.set('user', response.user);
                this.setState({user: response.user});

                // If the query string has a url push the user there. otherwise push them to home
                if (nextUrl) {
                    await this.props.router.push(nextUrl);
                } else {
                    await this.props.router.push('/');
                }
            }).catch(error => {
            // Display an error notification
            this.notyf.error(error.response.data.message);
        });
    };

    signUpWithFacebook = (code: string) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register/facebook/callback`, {params: {code: code}})
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await this.database.set('token', response.token);
                await this.database.set('user', response.user);
                this.setState({user: response.user});
            }).catch(error => {
            // Display an error notification and push them back to register page.
            this.notyf.error(error.response.data.message);
        });
    };

    signUpWithGoogle = (code: string) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register/google/callback`, {params: {code: code}})
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                await this.database.set('token', response.token);
                await this.database.set('user', response.user);
                this.setState({user: response.user});
            }).catch(error => {
            // Display an error notification and push them back to register page.
            this.notyf.error(error.response.data.message);
        });
    };

    signOut = () => {
        this.restService.makeHttpRequest(`logout`, `POST`).then(async (res: ResponseFactory<null>) => {
            this.notyf.success(res.message);
            this.setState({user: null});
            await this.database.delete('token');
            await this.database.delete('user')
        })
    };

    render() {
        const {Component, pageProps} = this.props;
        const userContextData = {
            user: this.state.user,
            signIn: this.signIn,
            signOut: this.signOut,
            signUp: this.signUp,
            signUpWithFacebook: this.signUpWithFacebook,
            signUpWithGoogle: this.signUpWithGoogle
        };

        return (
            <UserContext.Provider value={userContextData}>
                <Component {...pageProps} />
            </UserContext.Provider>
        );
    }
}
