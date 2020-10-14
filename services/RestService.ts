import DatabaseService from './DatabaseService';
import axios, {AxiosResponse} from 'axios';
import {ResponseFactory} from '../interfaces/ResponseFactory';

export class RestService {

    /**
     * Make a client side HTTP Request to the Hoop Spots API
     */
    async makeHttpRequest<T>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        body?: any,
        params?: any
    ) {
        const { database } = new DatabaseService();
        const token = await database.get('token');

        const options = {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: params
        };

        const route = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
        switch (method) {
            case 'GET':
                return axios.get<Promise<AxiosResponse<ResponseFactory<T>>>>(route, options).then(res => {
                    return res.data;
                });
            case 'POST':
                return axios.post(route, body, options).then(res => {
                    return res.data;
                });
            case 'PATCH':
                return axios.patch(route, body, options).then(res => {
                    return res.data;
                });
            case 'PUT':
                return axios.put(route, body, options).then(res => {
                    return res.data;
                });
            case 'DELETE':
                return axios.delete(route, options).then(res => {
                    return res.data;
                });
            default:
                throw `${method} is not a valid HTTP request.`
        }
    }

    async isLoggedIn(): Promise<boolean> {
        return this.makeHttpRequest(`validate`, `GET`).then((res: ResponseFactory<{valid: boolean}>) => {
            return res.data.valid;
        })
    }
}
