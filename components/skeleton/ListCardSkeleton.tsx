import {FunctionComponent} from 'react';

const ListCardSkeleton: FunctionComponent = () => {
    return (
        <div className="shadow overflow-hidden sm:rounded-md transform hover:scale-105 transition duration-500 ease-in-out bg-gray-300 h-32 animate-pulse">
            <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="leading-5 space-y-3 truncate py-2 w-full">
                        <div className="w-1/4 rounded h-4 bg-gray-400" />
                        <div className="w-2/6 rounded h-5 bg-gray-400" />
                        <div className="mt-2 flex-col md:flex-row md:flex space-x-2">
                            <div className="flex items-center text-sm leading-5 text-gray-500 space-x-1">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span className="tracking-tighter h-3 bg-gray-400 rounded w-24" />
                            </div>
                            <div className="flex items-center text-sm leading-5 text-gray-500 md:ml-2 md:mt-0 mt-2 space-x-1">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="tracking-tighter h-3 bg-gray-400 rounded w-24" />
                            </div>
                            <div className="flex items-center text-sm leading-5 text-gray-500 md:ml-2 md:mt-0 mt-2 space-x-1">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                                    </path>
                                </svg>
                                <span className="tracking-tighter h-3 bg-gray-400 rounded w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCardSkeleton;
