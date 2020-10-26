import React, {FunctionComponent} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Link from 'next/link';

type HoopSessionListCardProps = {
    hoopSession: HoopSession
}
dayjs.extend(localizedFormat);

const HoopSessionListCard: FunctionComponent<HoopSessionListCardProps> = (props) => {
    return (
        <li className="bg-white shadow overflow-hidden sm:rounded-md transform hover:scale-105 transition duration-500 ease-in-out"
            key={props.hoopSession.uuid}>
            <Link href={`hoopsession/${props.hoopSession.uuid}`}>
            <a className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out" >
                <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="leading-5 space-y-1 truncate py-2">
                                <h3 className="flex text-primary text-sm font-medium tracking-tight">
                                    {props.hoopSession.hoopspot?.full_address}
                                </h3>
                                <h2 className="flex text-lg md:text-2xl font-semibold mb-2 tracking-wide">
                                    {props.hoopSession.hoopspot?.name}
                                </h2>
                            </div>
                            <div className="mt-2 flex-col md:flex-row md:flex md:space-x-2">
                                <div className="flex items-center text-sm leading-5 text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="tracking-tighter font-light">{dayjs(props.hoopSession.start_time).format('LL')}</span>
                                </div>
                                <div className="flex items-center text-sm leading-5 text-gray-500 md:ml-2 md:mt-0 mt-2">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="tracking-tighter font-light">{dayjs(props.hoopSession.start_time).format('LT')} - {dayjs(props.hoopSession.end_time).format('LT')}</span>
                                </div>
                                <div className="flex items-center text-sm leading-5 text-gray-500 md:ml-2 md:mt-0 mt-2">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                                        </path>
                                    </svg>
                                    <span className="tracking-tighter font-light">{props.hoopSession.members?.length} attending</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0">
                            <div className="flex overflow-hidden">
                                {props.hoopSession.members?.map((user: User, index) => (
                                    // Show the first 5 members
                                    index < 5 ?
                                        <span className="-mr-1" key={index + ' ' + user.uuid}>
                                            <img className="w-6 h-6 rounded-full" src={user.avatar}
                                                 alt={`${user.name} image`}/>
                                        </span>
                                        : null
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="ml-5 flex-shrink-0"><svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg></div>
                </div>
            </a>
            </Link>
        </li>
    )
};

export default HoopSessionListCard;
