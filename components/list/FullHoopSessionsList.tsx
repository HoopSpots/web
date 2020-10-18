import React, {Component} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Link from 'next/link';

type FullHoopSessionsListProps = {
    hoopSessions: HoopSession[] | null | undefined;
}

dayjs.extend(localizedFormat);

export class FullHoopSessionsList extends Component<FullHoopSessionsListProps> {
    constructor(props: FullHoopSessionsListProps) {
        super(props);
    }


    render() {
        return (
            <ul className="space-y-4">
                {
                    this.props.hoopSessions?.map(hoopSession => (
                        <li className="bg-white shadow overflow-hidden sm:rounded-md" key={hoopSession.uuid}>
                            <Link href={`/hoopsession/${hoopSession.uuid}`}>
                                <a className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="leading-5 space-y-1 truncate">
                                                    <h5 className="flex text-xs font-medium">{dayjs(hoopSession.start_time).format('dddd, MMM D, YYYY')}</h5>
                                                    <h3 className="flex text-primary text-md font-semibold">
                                                        {dayjs(hoopSession.start_time).format('LT')} - {dayjs(hoopSession.end_time).format('LT')}
                                                    </h3>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div
                                                        className="flex items-center text-sm leading-5 text-gray-500 space-x-1">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                             fill="currentColor" viewBox="0 0 20 20"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                                        </svg>
                                                        <span>{hoopSession.members?.length} {dayjs().isBefore(dayjs(hoopSession.end_time)) ? 'attending': 'attended'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                                                <div className="flex overflow-hidden">
                                                    {hoopSession.members?.map((user: User, index) => (
                                                        // Show the first 5 members
                                                        index < 5 ?
                                                            <span className="-mr-1" key={hoopSession.uuid + '' + index + ' ' + user.uuid}>
                                                                <img
                                                                    className={`inline-block h-6 w-6 rounded-full text-white shadow-solid ${index > 0 ? '-ml-1' : ''}`}
                                                                    src={user.avatar}
                                                                    alt={`${user.name} image`}/>
                                                            </span>
                                                            : null
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
