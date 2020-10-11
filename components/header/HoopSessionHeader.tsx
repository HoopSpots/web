import React, {Component} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type MyProps = {
    hoopSession: HoopSession;
};

dayjs.extend(localizedFormat);

export class HoopSessionHeader extends Component<MyProps> {
    render() {
        return (
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold leading-5 text-primary mb-1">Sunday, October 18, 2020</h4>
                    <h2 className="text-4xl font-black tracking-wide">
                        {dayjs(this.props.hoopSession.start_time).format('LT')} - {dayjs(this.props.hoopSession.end_time).format('LT')}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                      clipRule="evenodd"/>
                            </svg>
                            {this.props.hoopSession.hoopspot?.name}
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                      clipRule="evenodd"/>
                            </svg>
                            {this.props.hoopSession.hoopspot?.street_address} {this.props.hoopSession.hoopspot?.city} {this.props.hoopSession.hoopspot?.state}  {this.props.hoopSession.hoopspot?.zip}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">

                    <div className="hidden sm:block ml-3 shadow-sm rounded-md">
                        <button type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-primary bg-white focus:outline-none focus:shadow-outline-orange transition duration-150 ease-in-out">
                            <svg className="-ml-1 mr-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                      clipRule="evenodd"/>
                            </svg>
                            Share
                        </button>
                    </div>

                    <div className="sm:ml-3 shadow-sm rounded-md">
                        <button type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary focus:outline-none focus:shadow-outline-orange transition duration-150 ease-in-out">
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                            Attend
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
