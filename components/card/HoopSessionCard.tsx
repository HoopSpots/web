import React, {Component} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Link from 'next/link';

type MyProps = {
    hoopSession: HoopSession
};
type MyState = {};

dayjs.extend(localizedFormat);

export class HoopSessionCard extends Component<MyProps, MyState> {
    render() {
        return (
            <Link href={`/hoopsession/${this.props.hoopSession.uuid}`}>
                <a href={`/hoopsession/${this.props.hoopSession.uuid}`}>
                    <div
                        className="h-full flex flex-col border max-w-sm rounded-tl-4xl rounded-br-5xl relative focus:outline-none mx-1">
                        <div className="w-full h-56 sm:h-64 bg-cover bg-center rounded rounded-tl-4xl"
                             style={{backgroundImage: `url(${this.props.hoopSession.hoop_spot?.image})`}}/>
                        <div className="py-6 px-10">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h5 className="text-2xl font-bold truncate">
                                    {dayjs(this.props.hoopSession.start_time).format('ddd, MMM D, h:mm A')}
                                </h5>

                            </div>
                            <div className="flex flex-col sm:flex-row mt-2 sm:mt-4">
                                <div className="flex items-center mt-2 sm:mt-0">
                                    <svg className="h-6 w-6 fill-current text-orange-600" viewBox="0 0 512 512">
                                        <path
                                            d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                                    </svg>
                                    <span className="font-bold text-xs">{this.props.hoopSession.distance_away} Miles Away</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row mt-2 sm:mt-4">
                                <div className="flex items-center mt-2 sm:mt-0">
                                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-bold text-xs">{this.props.hoopSession.hoop_spot?.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row mt-2 sm:mt-4">
                                <div className="flex mt-2">
                                    <div className="flex flex-row-reverse justify-end mr-2">
                                        {this.props.hoopSession.first_five_attending?.map((user: User, index) => (
                                            // Show the first 5 members
                                            index < 5 ?
                                                <span className="-mr-1" key={index + ' ' + user.uuid}>
                                            <img className="w-6 h-6 rounded-full" src={user.avatar}
                                                 alt={`${user.name} image`}/>
                                        </span>
                                                : null
                                        ))}
                                    </div>
                                    <div className="flex-1 font-base text-gray-600 text-sm">
                                        {this.props.hoopSession.members_count} people going
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}
