import 'tailwindcss/tailwind.css'
import '../styles/slider.css'
import 'notyf/notyf.min.css';
import App from 'next/app';
import DatabaseService, { DBMethods } from '../services/DatabaseService';
import {LoginRequest} from '../interfaces/requests/LoginRequest';
import axios from 'axios';
import {LoginResponse} from '../interfaces/responses/LoginResponse';
import {Notyf} from 'notyf';
import {RestService} from '../services/RestService';
import {ResponseFactory} from '../interfaces/ResponseFactory';
import UserContext from '../components/context/UserContext'

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

  signIn = (loginRequest: LoginRequest) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, loginRequest)
        .then(async res => {
          // let's get the token and user from the response.
          let response: LoginResponse = res.data.data;
          await this.database.set('token', response.token);
          await this.database.set('user', response.user);

          // Push user to the next route
          await this.props.router.push('/');
        }).catch(error => {
      // Display an error notification
      this.notyf.error(error.response.data.message);
    })
  };

  signOut = () => {
    this.restService.makeHttpRequest(`logout`, `POST`).then(async res => {
      const response: ResponseFactory<null> = res.data;
      this.notyf.success(response.message);
      this.database.clear();
    })
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
        <UserContext.Provider value={{user: this.state.user, signIn: this.signIn}}>
          <Component {...pageProps} />
        </UserContext.Provider>
    );
  }
}
