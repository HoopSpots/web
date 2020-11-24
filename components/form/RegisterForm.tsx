import React, {FunctionComponent, useContext, useState} from 'react';
import {useRouter} from 'next/router';
import UserContext from '../context/UserContext';
import {RegisterRequest} from '../../interfaces/requests/RegisterRequest';
import Link from 'next/link';
import axios from 'axios';

const RegisterForm: FunctionComponent = () => {
    const {signUp} = useContext(UserContext);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const registerFormSubmitHandler = (event: any) => {
        event.preventDefault();

        const request: RegisterRequest = {
            name: name,
            email: email,
            password: password
        };

        if (signUp) {
            if (router.query?.ref) {
                signUp(request, router.query?.ref as string);
            }else {
                signUp(request);
            }
        }
    };

    const getFacebookSignUpUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/facebook`).then((res) =>{
            window.location.href = res.data.data;
        })
    };

    const getGoogleSignUpUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/google`).then((res) =>{
            window.location.href = res.data.data;
        })
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <form className="bg-white max-w-4xl rounded-lg mx-auto shadow-lg px-24 py-16 text-center" onSubmit={registerFormSubmitHandler}>
                <button onClick={() => getGoogleSignUpUrl()} type="button" className="border font-semibold shadow w-full py-3 rounded inline-flex justify-center items-center text-gray-800 focus:outline-none focus:shadow-outline mb-4">
                    <img src="/images/google.png" alt="Google" className="-ml-1 mr-2 h-5 w-5" />
                    Register with Google
                </button>
                <button onClick={() => getFacebookSignUpUrl()} type="button" className="border font-semibold shadow w-full py-3 rounded inline-flex justify-center items-center text-gray-800 focus:outline-none focus:shadow-outline mb-4">
                    <img src="/images/facebook.png" alt="Facebook" className="-ml-1 mr-2 h-5 w-5" />
                    Register with Facebook
                </button>
                <p className="text-gray-600 my-2">or</p>
                <div className="text-left w-full text-gray-800 mt-5">
                    <p className="font-semibold mb-1">Name</p>
                    <input className="border-b w-full px-2 py-2 focus:outline-none" placeholder="Enter your name" value={name} type="text"
                           onChange={event => setName(event.target.value)} required/>
                </div>
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
                    Register
                </button>
                <p className="mt-10 text-gray-800 font-semibold">
                    Already have an account? <Link href="/login" ><a className="text-indigo-500"> Sign In</a></Link>
                </p>

            </form>
        </div>
    );
};

export default RegisterForm;
