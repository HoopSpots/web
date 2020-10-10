import DatabaseService from './DatabaseService';
import axios, {AxiosResponse} from 'axios';
import {ResponseFactory} from '../interfaces/ResponseFactory';

export class RestService {
    async makeHttpRequest<T>(
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        body?: any,
        params?: any
    ) {
        const { database } = new DatabaseService();
        await database.set('token', '2|PMOfKTApnkn7ZeIvzRimrZfK553XMjdMIzuTUb2e');
        const token = await database.get('token');
        console.log(token);

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

}
