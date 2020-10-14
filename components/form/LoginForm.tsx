import {Component} from 'react';
import axios from 'axios';
import {LoginRequest} from '../../interfaces/requests/LoginRequest';
import DatabaseService from '../../services/DatabaseService';
import {LoginResponse} from '../../interfaces/responses/LoginResponse';
import {Notyf} from 'notyf';
import {WithRouterProps} from 'next/dist/client/with-router';
import {withRouter} from 'next/router';

type LoginState = {
    email: string;
    password: string;
};

export class LoginForm extends Component<WithRouterProps, LoginState>{
    constructor(props: WithRouterProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    componentDidMount(): void {

    }

    formSubmitHandler = (event: any) => {
        event.preventDefault();

        const request: LoginRequest = {
            email: this.state.email,
            password: this.state.password
        };

        const { database } = new DatabaseService();

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, request)
            .then(async res => {
                // let's get the token and user from the response.
                let response: LoginResponse = res.data.data;
                console.log(response);
                await database.set('token', response.token);
                await database.set('user', response.user);

                // Push user to the next route
                this.props.router.push('/');
            }).catch(error => {
            // Create an instance of Notyf
            const notyf = new Notyf();

            // Display an error notification
            notyf.error(error.response.data.message);
        })
    };

    render() {
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
                        Sign in into your account
                    </h2>
                    <span className="text-sm">or <a href="#" className="text-primary">
                         register a new account
                      </a>
                   </span>
                </div>
                <div className="flex justify-center my-2 mx-4 md:mx-0">
                    <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={this.formSubmitHandler}>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor='Password'>Email address</label>
                                <input
                                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type='email'
                                    value={this.state.email}
                                    onChange={event => this.setState({email: event.target.value})}
                                    placeholder="Your Email Address"
                                    required/>
                            </div>
                            <div className="w-full md:w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor='Password'>Password</label>
                                <input
                                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type='password'
                                    value={this.state.password}
                                    onChange={event => this.setState({password: event.target.value})}
                                    placeholder="Your Password"
                                    required/>
                            </div>
                            <div className="w-full flex items-center justify-between px-3 mb-3 ">
                                <label htmlFor="remember" className="flex items-center w-1/2">
                                    <input type="checkbox" name="" id="" className="mr-1 form-checkbox text-primary focus:shadow-outline-orange focus:outline-none"/>
                                        <span className="text-sm text-gray-700 pt-1">Remember Me</span>
                                </label>
                                <div className="w-1/2 text-right">
                                    <a href="#" className="text-primary text-sm tracking-tight">Forget your
                                        password?</a>
                                </div>
                            </div>
                            <div className="w-full md:w-full px-3 mb-6">
                                <button
                                    type="submit"
                                    className="appearance-none block w-full bg-primary text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:text-white focus:outline-none  focus:shadow-outline-orange">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default withRouter(LoginForm);
