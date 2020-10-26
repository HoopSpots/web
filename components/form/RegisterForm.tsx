import {FunctionComponent, useContext, useState} from 'react';
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

    const getFacebookOAuthUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register/facebook`).then((res) =>{
            window.location.href = res.data.data;
        })
    };

    const getGoogleOAuthUrl = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register/google`).then((res) =>{
            window.location.href = res.data.data;
        })
    };

    const getRegisterForm = () => {
        return (
            <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={registerFormSubmitHandler}>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor='Password'>Name</label>
                        <input
                            className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type="text"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            placeholder="Your Name"
                            required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor='Password'>Email address</label>
                        <input
                            className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Your Email Address"
                            required/>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor='Password'>Password</label>
                        <input
                            className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            type='password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            placeholder="Your Password"
                            required/>
                    </div>
                    <div className="w-full flex items-center justify-between px-3 mb-3 ">
                        <label htmlFor="remember" className="flex items-center w-1/2">
                            <input type="checkbox" name="" id=""
                                   className="mr-1 form-checkbox text-primary focus:shadow-outline-orange focus:outline-none"/>
                            <span className="text-sm text-gray-700 pt-1">Remember Me</span>
                        </label>
                        <div className="w-1/2 text-right">
                            <Link href="/login">
                                <a className="text-primary text-xs md:text-sm tracking-tight">Already have an account?</a>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-full px-3 mb-6">
                        <button
                            type="submit"
                            className="appearance-none block w-full bg-primary text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:text-white focus:outline-none  focus:shadow-outline-orange">
                            Sign Up
                        </button>
                    </div>
                    <div className="mx-auto -mb-6 pb-1">
                        <span className="text-center text-xs text-gray-700">or sign up with</span>
                    </div>
                    <div className="flex items-center w-full mt-2">
                        <div className="w-full md:w-1/2 px-3 pt-4 mx-2">
                            <button onClick={() => getFacebookOAuthUrl()} type="button" className="flex items-center justify-center block w-full border border-transparent text-sm py-3 px-3 leading-tight font-medium focus:outline-none rounded-md text-gray-900 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                                <img src="/images/facebook.png" alt="facebook" className="-ml-1 mr-2 h-5 w-5" />
                                Facebook
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 px-3 pt-4 mx-2">
                            <button onClick={() => getGoogleOAuthUrl()} type="button" className="flex items-center justify-center block w-full border border-transparent text-sm py-3 px-3 leading-tight font-medium focus:outline-none rounded-md text-gray-900 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                                <img src="/images/google.png" alt="Google" className="-ml-1 mr-2 h-5 w-5" />
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    };

    return (
        <section className="py-8 md:py-16 md:my-0 bg-accent">
            <div className="text-center">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-primary" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>
                <h2 className="text-4xl tracking-tight font-semibold">
                    Sign up for Hoop Spots
                </h2>
            </div>
            <div className="flex justify-center my-2 mx-4 md:mx-0">
                {getRegisterForm()}
            </div>
        </section>
    );
};

export default RegisterForm;
