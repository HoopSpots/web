import React, {FunctionComponent, useState} from 'react';
import Link from 'next/link';

type NotificationDropdownProps = {
    notifications: LaravelNotification[];
    markAllAsRead(event: React.MouseEvent<HTMLButtonElement>): void;
}

const NotificationDropdown: FunctionComponent<NotificationDropdownProps> = (props) => {
    const [active, setActive] = useState<boolean>(false);

    const displayNotifications = () => {
        if (active) {
            return (
                <div className="fixed inset-0 overflow-hidden z-50">
                    <div className="absolute inset-0 overflow-hidden">
                        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                            <div className="w-screen max-w-md">
                                <div
                                    className="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
                                    <header className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between space-x-3">
                                            <h2 className="text-lg leading-7 font-medium text-gray-900">
                                                Notifications
                                            </h2>
                                            <div className="h-7 flex items-center">
                                                <button onClick={() => setActive(false)} aria-label="Close panel"
                                                        className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none">
                                                    {/* Heroicon name: x */}
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="relative flex-1 px-4 sm:px-6">
                                        <div className="absolute inset-0 px-4 sm:px-6">
                                            {
                                                props.notifications.length > 0 ? (

                                                    <div>
                                                        <ul className="divide-y divide-gray-200">
                                                            {
                                                                props.notifications.map(notification => (
                                                                    <li className="py-4" key={notification.id}>
                                                                        <Link
                                                                            href={`/${notification.data.page}/${notification.data.params.uuid}`}>
                                                                            <a className="flex space-x-3">
                                                                                <div className="flex-1 space-y-1">
                                                                                    <div
                                                                                        className="flex items-center justify-between">
                                                                                        <h3 className="text-sm font-medium leading-5">
                                                                                            {notification.data.title}
                                                                                        </h3>
                                                                                        <p className="text-sm leading-5 text-gray-500">1h</p>
                                                                                    </div>
                                                                                    <p className="text-sm leading-5 text-gray-500">
                                                                                        {notification.data.message}
                                                                                    </p>
                                                                                </div>
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                        <div
                                                            className="absolute bottom-0 right-0 pr-3 py-4 text-sm leading-5 border-gray-200">
                                                            <button onClick={props.markAllAsRead}
                                                                    className="text-primary font-semibold focus:outline-none">Mark
                                                                All As Read
                                                            </button>
                                                        </div>
                                                    </div>

                                                ) : (
                                                    <div className="text-center">
                                                        You're all caught up :)
                                                    </div>
                                                )

                                            } </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="relative">
            <button onClick={() => setActive(!active)}
                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                    aria-label="Notifications">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
            </button>
            {
                active ? displayNotifications() : null
            }
        </div>
    );
};

export default NotificationDropdown;
