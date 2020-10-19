import React, {FunctionComponent, useContext, useState} from 'react';
import UserContext from '../context/UserContext';
import {useRouter} from 'next/router';

type ProfileDropdownProps = {
    user: User;
}

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = (props) => {
    const [active, setActive] = useState<boolean>(false);
    const { signOut } = useContext(UserContext);
    const router = useRouter();

    const logout = () => {
        if (signOut) {
            signOut();
            router.push('/');
        }
    };

    return (
        <div className="ml-3 relative">
            <div>
                <button
                    onClick={() => setActive(!active)}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true">
                    <img className="h-8 w-8 rounded-full"
                         src={props.user.avatar}
                         alt={props.user.name}/>
                </button>
            </div>
            <div
                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition ease-out duration-100 ${active ? "transform opacity-100 scale-100" : "transform opacity-0 scale-95"}`}>
                <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                     aria-labelledby="user-menu">
                    <a href="#"
                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Your Profile</a>
                    <a href="#"
                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Settings</a>
                    <button onClick={() => logout()}
                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Sign out</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileDropdown;
