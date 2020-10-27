import {FunctionComponent, useContext, useState} from 'react';
import MobileMenu from '../menu/MobileMenu';
import UserContext from '../context/UserContext';
import ProfileDropdown from '../dropdown/ProfileDropdown';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import NotificationDropdown from '../dropdown/NotificationDropdown';


const NavHeader: FunctionComponent = () => {
    const { user } = useContext(UserContext);
    const [showMobile, setShowMobile] = useState<boolean>(false);
    const router = useRouter();
    const [notifications, setNotifications] = useState<LaravelNotification[]>([]);
    const [loadedNotifications, setLoadedNotifications] = useState<boolean>(false);
    const restService = new RestService();

    const getNotifications = () => {
        if (loadedNotifications) {
            restService.makeHttpRequest(`notifications/unread`, `GET`).then((res: ResponseFactory<LaravelNotification[]>) => {
                setNotifications(res.data);
                setLoadedNotifications(true);
            }).catch(err => console.log(err));
        }
    };

    const guestMenu = () => {
        return (
            <>
                <Link href='/login'>
                    <a
                        className="text-base leading-6 font-medium text-primary focus:outline-none transition ease-in-out duration-150">
                        Sign In
                    </a>
                </Link>

                <Link href='/register'>
                    <a
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition ease-in-out duration-150">
                        Sign Up
                    </a>
                </Link>
            </>
        )
    };

    const authenticatedMenu = () => {
        if (user != null) {
            getNotifications();
            return (
                <>
                    <NotificationDropdown notifications={notifications} markAllAsRead={clearNotifications}/>
                    <ProfileDropdown user={user}/>
                </>
            );
        }
    };

    const clearNotifications = () => {
        restService.makeHttpRequest(`notifications`, `POST`).then((res: ResponseFactory<null>) => {
            console.log(res);
            setNotifications([]);
        })
    };

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl container mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            aria-label="Main menu" aria-expanded="false" onClick={() => setShowMobile(!showMobile)}>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <a className="flex-shrink-0 flex items-center md:mr-5" href="#">
                            <img className="hidden lg:block h-8 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow logo"/>
                        </a>
                        <div className="hidden sm:ml-6 sm:flex">
                            <Link href="/">
                                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${router.asPath == '/' ? 'text-primary border-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Explore
                                </a>
                            </Link>
                            <Link href="/hoopspots">
                                <a className={`ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${router.asPath == '/hoopspots' ? 'text-primary border-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Spots
                                </a>
                            </Link>
                            <Link href="/hoopsessions">
                                <a className={`ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${router.asPath == '/hoopsessions' ? 'text-primary border-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Sessions
                                </a>
                            </Link>

                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-5">
                        {
                            user != null ? authenticatedMenu() : guestMenu()
                        }
                    </div>
                </div>
            </div>

            <MobileMenu active={showMobile}/>
        </nav>
    );
};

export default NavHeader;
