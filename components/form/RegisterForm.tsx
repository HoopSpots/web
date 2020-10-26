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
                                <a className="text-primary text-sm tracking-tight">Already have an account?</a>
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
                        <div className="w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400">
                            <button onClick={() => getFacebookOAuthUrl()} type="button" className="appearance-none flex items-center justify-center block w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                                <svg className="h-6 w-6 fill-current text-gray-700" viewBox="0 0 512 512">
                                    <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-full md:w-1/3 px-3 pt-4 mx-2">
                            <button className="appearance-none flex items-center justify-center block w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                                <svg className="h-6 w-6 fill-current text-gray-700" viewBox="0 0 512 512">
                                    <path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400">
                            <button className="appearance-none flex items-center justify-center block w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                                <svg className="h-6 w-6 fill-current text-gray-700" viewBox="0 0 512 512">
                                    <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    };

    return (
        <section className="md:py-16 md:my-0 bg-accent">
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
