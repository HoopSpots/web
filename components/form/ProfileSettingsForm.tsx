import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {RestService} from '../../services/RestService';
import UserContext from '../context/UserContext';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {Notyf} from 'notyf';


const ProfileSettingsForm: FunctionComponent = () => {
    const restService = new RestService();
    const imageRef = useRef(null);
    const {updateUser, user} = useContext(UserContext);
    const [profileUrl, setProfileUrl] = useState<string>('');
    const [loadedProfileUrl, setLoadedProfileUrl] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<any>(user?.avatar);
    useEffect(() => {
        if (!loadedProfileUrl) {
            setProfileUrl(`${document.location.host}/profile/${user?.slug}`);
            setLoadedProfileUrl(true);
        }
    });

    const updateProfileSettingsHandler = (event: any) => {
        event.preventDefault();

        // only send request if image changed
        if (avatar != user?.avatar) {
            const notyf = new Notyf();
            const body = {avatar: avatar};
            restService.makeHttpRequest(`account`, `PATCH`, body).then((res: ResponseFactory<User>) => {
                if (updateUser) {
                    updateUser(res.data);
                }
                notyf.success(res.message);
            }).catch(error => {
                console.log(error);
                // notyf.error(error.response.data.message);
            });
        }
    };

    const openImage = () => {
        if (imageRef != null) {
            // @ts-ignore
            imageRef.current.click()
        }
    };

    const fileChange = (event: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = ()=> {
            setAvatar(reader.result);
        };
    };

    return (
        <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                            This information will be displayed on Hoop Spots.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={updateProfileSettingsHandler}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="company_website"
                                               className="block text-sm font-medium leading-5 text-gray-700">
                                            Profile URL
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span
                                                className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                https://
                                            </span>
                                            <input id="company_website"
                                                   disabled={true}
                                                   className="form-input bg-gray-50 text-gray-500 cursor-not-allowed flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                   value={profileUrl}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm leading-5 font-medium text-gray-700">
                                        Avatar
                                    </label>
                                    <div className="mt-2 flex items-center">
                                        <img
                                            className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100"
                                            src={avatar} alt={user?.name}/>
                                            <input id="image"
                                                   type='file'
                                                   accept="image/*"
                                                   className="hidden"
                                                   name="image"
                                                   onChange={(e) => fileChange(e)}
                                                   ref={imageRef}/>
                                        <span className="ml-5 rounded-md shadow-sm">
                                            <button onClick={openImage} type="button" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-orange active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                                Change
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <span className="inline-flex rounded-md shadow-sm">
                                    <button type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition duration-150 ease-in-out">
                                        Save
                                    </button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsForm;
