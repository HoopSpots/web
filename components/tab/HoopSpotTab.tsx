import React, {Component} from 'react';
import {HoopSpotTabEnum} from '../../interfaces/enums/HoopSpotTabEnum';

type HoopSpotTabProps = {
    selectTab: (tab: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions) => void;
    selected: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions;
}

type HoopSpotTabState = {};

export class HoopSpotTab extends Component<HoopSpotTabProps, HoopSpotTabState>{
    constructor(props: HoopSpotTabProps) {
        super(props);
        this.select = this.select.bind(this);
    }

    select = (tab: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions) => {
        this.props.selectTab(tab)
    };

    render() {
        return (
            <nav className="flex -mb-px">
                <button
                    onClick={() => this.select(HoopSpotTabEnum.sessions)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none ${this.props.selected === HoopSpotTabEnum.sessions ? "text-primary border-primary": "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"}`}>
                    <svg
                        className={`-ml-0.5 mr-2 h-5 w-5 ${this.props.selected === HoopSpotTabEnum.sessions ? 'text-primary': 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'}`}
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"/>
                    </svg>
                    <span>Sessions</span>
                </button>
                <button
                    onClick={() => this.select(HoopSpotTabEnum.members)}
                    className={`ml-8 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none ${this.props.selected === HoopSpotTabEnum.members ? "text-primary border-primary": "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"}`}
                    aria-current="page">
                    <svg
                        className={`-ml-0.5 mr-2 h-5 w-5 ${this.props.selected === HoopSpotTabEnum.members ? 'text-primary': 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'}`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span>Members</span>
                </button>
                <button
                    onClick={() => this.select(HoopSpotTabEnum.discussions)}
                    className={`ml-8 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none ${this.props.selected === HoopSpotTabEnum.discussions ? "text-primary border-primary": "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"}`}>
                    <svg
                        className={`-ml-0.5 mr-2 h-5 w-5 ${this.props.selected === HoopSpotTabEnum.discussions ? 'text-primary': 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'}`}
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                              clipRule="evenodd"/>
                    </svg>
                    <span>Discussions</span>
                </button>
            </nav>
        );
    }
}
