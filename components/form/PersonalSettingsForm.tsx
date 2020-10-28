import React, {FunctionComponent, useContext, useState} from 'react';
import states from '../../public/states.json'
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import UserContext from '../context/UserContext';
import {Notyf} from 'notyf';

type PersonalSettingsFormProps = {
    user: User | null;
}

const PersonalSettingsForm: FunctionComponent<PersonalSettingsFormProps> = (props) => {
    const restService = new RestService();
    const {updateUser} = useContext(UserContext);
    const [name, setName] = useState(props.user?.name);
    const [city, setCity] = useState(props.user?.primary_city ?? '');
    const [state, setState] = useState(props.user?.primary_state  ?? 'MN');

    const updatePersonalSettingsHandler = (event: any) => {
        const notyf = new Notyf();
        event.preventDefault();
        const body = {
            name: name,
            primary_city: city,
            primary_state: state
        };

        restService.makeHttpRequest(`account`, `PATCH`, body).then((res: ResponseFactory<User>) => {
            notyf.success(res.message);
            if (updateUser) {
                updateUser(res.data);
            }
        }).catch(err => {
            console.log(err);
            notyf.error(err.response.data.message);
        });
    };

    return (
        <div>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-600">
                                Update your name and location.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={updatePersonalSettingsHandler}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label htmlFor="full_name" className="block text-sm font-medium leading-5 text-gray-700">Full Name</label>
                                            <input id="full_name"
                                                   onChange={e => setName(e.target.value)}
                                                   value={name}
                                                   className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                        <div className="col-span-6">
                                            <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
                                            <input id="email_address"
                                                   disabled={true}
                                                   value={props.user?.email}
                                                   className="mt-1 bg-gray-50 text-gray-500 cursor-not-allowed form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label htmlFor="city" className="block text-sm font-medium leading-5 text-gray-700">City</label>
                                            <input
                                                id="city"
                                                onChange={e => setCity(e.target.value)}
                                                value={city}
                                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                        <div className="col-span-6 md:col-span-3">
                                            <label htmlFor="state"
                                                   className="block text-sm font-medium leading-5 text-gray-700">State</label>
                                            <select id="state"
                                                    value={state}
                                                    onChange={e => setState(e.target.value)}
                                                    className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                                {
                                                    states.map(state => (
                                                        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition duration-150 ease-in-out">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalSettingsForm;
