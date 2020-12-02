import React, {FunctionComponent, useContext, useState} from 'react';
import {LoginRequest} from '../../interfaces/requests/LoginRequest';
import UserContext from '../context/UserContext';
import {useRouter} from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const LoginForm: FunctionComponent = () => {
    const {signIn} = useContext(UserContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const loginFormSubmitHandler = (event: any) => {
        event.preventDefault();

        const request: LoginRequest = {
            email: email,
            password: password
        };

        if (signIn) {
            if (router.query?.ref) {
                signIn(request, router.query?.ref as string);
            }else {
                signIn(request);
            }

        }
    };

    const getFacebookLoginUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/facebook`).then((res) =>{
            window.location.href = res.data.data;
        })
    };

    const getGoogleLoginUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/google`).then((res) =>{
            window.location.href = res.data.data;
        })
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <form className="bg-white max-w-4xl rounded-lg mx-auto shadow-lg px-24 py-16 text-center" onSubmit={loginFormSubmitHandler}>
                <button onClick={() => getGoogleLoginUrl()} type="button" className="border font-semibold shadow w-full py-3 rounded inline-flex justify-center items-center text-gray-800 focus:outline-none focus:shadow-outline mb-4">
                    <img src="/images/google.png" alt="Google" className="-ml-1 mr-2 h-5 w-5" />
                    Log in with Google
                </button>
                <button onClick={() => getFacebookLoginUrl()} type="button" className="border font-semibold shadow w-full py-3 rounded inline-flex justify-center items-center text-gray-800 focus:outline-none focus:shadow-outline mb-4">
                    <img src="/images/facebook.png" alt="Facebook" className="-ml-1 mr-2 h-5 w-5" />
                    Log in with Facebook
                </button>
                <p className="text-gray-600 my-2">or</p>
                <div className="text-left w-full text-gray-800 mt-5">
                    <p className="font-semibold mb-1">Email</p>
                    <input className="border-b w-full px-2 py-2 focus:outline-none" placeholder="Enter your email" value={email} type="email"
                           onChange={event => setEmail(event.target.value)} required/>
                </div>
                <div className="text-left w-full text-gray-800 mt-3">
                    <p className="font-semibold mb-1">Password</p>
                    <input className="border-b w-full px-2 py-2 focus:outline-none" placeholder="Enter your password"
                           value={password} type="password"
                           onChange={event => setPassword(event.target.value)} required/>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" type="checkbox" className="form-checkbox bg-gray-100 h-4 w-4 text-indigo-500 transition duration-150 ease-in-out" /><label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-800">Remember me</label>
                    </div>
                    <div className="text-xs leading-5">
                        <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400 focus:outline-none focus:underline transition ease-in-out duration-150">Forgot your password?</a>
                    </div>
                </div>
                <button type="submit" className="bg-gray-900 shadow w-full py-2 text-white rounded font-semibold mt-10">
                    Log in
                </button>
                <p className="mt-10 text-gray-800 font-semibold">
                    Don't have an account? <Link href="/register" ><a className="text-indigo-500">Register</a></Link>
                </p>

            </form>
        </div>
    )
};

export default LoginForm;
