import React, {Component} from 'react';
import {SortMemberEnum} from '../../interfaces/enums/SortMemberEnum';
import {HoopSpotTabEnum} from '../../interfaces/enums/HoopSpotTabEnum';
import {HoopSpotTab} from '../tab/HoopSpotTab';
import {FullMemberList} from '../list/FullMemberList';
import {SortMemberDropdown} from '../dropdown/SortMemberDropdown';
import {FullHoopSessionsList} from '../list/FullHoopSessionsList';
import {DateFilterEnum} from '../../interfaces/enums/DateFilterEnum';
import dayjs from 'dayjs';
import CommentList from '../list/CommentList';

type HoopSpotSectionProps = {
    hoopSpot: HoopSpot
}

type HoopSpotSectionState = {
    sortBy: SortMemberEnum | undefined;
    searchInput: string | undefined;
    showDropdown: boolean;
    selectedTab: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions;
    members: User[] | null | undefined;
    filterSessionsByDate: DateFilterEnum.past | DateFilterEnum.upcoming;
}

export class HoopSpotSection extends Component<HoopSpotSectionProps, HoopSpotSectionState> {
    constructor(props: HoopSpotSectionProps) {
        super(props);
        this.state = {
            sortBy: undefined,
            searchInput: undefined,
            showDropdown: false,
            selectedTab: HoopSpotTabEnum.members, // default
            members: this.props.hoopSpot.members,
            filterSessionsByDate: DateFilterEnum.upcoming
        }
        this.selectTab = this.selectTab.bind(this);
    }

    selectSortMember = (option: SortMemberEnum.joined | SortMemberEnum.alphabetical) => {
        console.log(option)
    };

    selectTab = (tab: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions) => {
        this.setState({selectedTab: tab});
    };

    searchMembers() {
        if (this.state.searchInput === '' || this.state.searchInput === undefined) {
            return this.state.members;
        }

        return this.state.members?.filter(member => {
            if (this.state.searchInput === undefined) {
                return member;
            } else if (member.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) || member.email.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
                return member
            }
        });
    }

    filterSessions() {
        return this.props.hoopSpot.hoop_sessions?.filter(hoopSession => {
            if (this.state.filterSessionsByDate === DateFilterEnum.past) {
                return dayjs().isAfter(dayjs(hoopSession.end_time))
            }

            return dayjs().isBefore(dayjs(hoopSession.end_time));
        })
    }

    getMemberContainer() {
        return (
            <div className="bg-white rounded-md shadow-md py-8 px-4 w-full md:max-w-4xl mx-auto">
                <div className="flex justify-between relative">
                    <h3 className="font-medium tracking-wide text-2xl text-gray-800 inline-flex items-center">
                        Members
                    </h3>
                    <button
                        onClick={() => this.setState({showDropdown: !this.state.showDropdown})}
                        className="font-base inline-flex tracking-wide text-sm focus:outline-none text-gray-600">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
                        </svg>
                        Sort
                    </button>
                    <SortMemberDropdown selectSortOption={this.selectSortMember}
                                        showDropdown={this.state.showDropdown}/>
                </div>
                <div className="flex border-b">
                    <input id="email"
                           onChange={event => this.setState({searchInput: event.target.value})}
                           className="form-input block w-full my-4 px-2 py-3 text-md sm:leading-5 border-gray-100 rounded-lg shadow-md border-2 focus:outline-none"
                           placeholder="Search for Members"/>
                </div>
                <FullMemberList members={this.searchMembers()}/>
            </div>
        )
    }

    getSessionsContainer() {
        return (
            <div className="md:max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="hidden md:block col-span-1">
                        <nav className="bg-white shadow rounded-lg border-gray-50">
                            <span
                                onClick={() => this.setState({filterSessionsByDate: DateFilterEnum.upcoming})}
                                className={`cursor-pointer rounded-t group flex items-center px-3 py-2 leading-5 focus:outline-none transition ease-in-out duration-150  ${this.state.filterSessionsByDate === DateFilterEnum.upcoming ? 'border-r-4 border-primary text-md font-semibold text-primary': 'text-sm font-medium text-gray-900 hover:text-gray-600'}`}>
                                Upcoming
                            </span>
                            <span
                                onClick={() => this.setState({filterSessionsByDate: DateFilterEnum.past})}
                                className={`cursor-pointer rounded-t group flex items-center px-3 py-2 leading-5 focus:outline-none transition ease-in-out duration-150  ${this.state.filterSessionsByDate === DateFilterEnum.past ? 'border-r-4 border-primary text-md font-semibold text-primary': 'text-sm font-medium text-gray-900 hover:text-gray-600'}`}>
                                Past
                            </span>
                        </nav>
                    </div>
                    <div className="col-span-2">
                        <FullHoopSessionsList hoopSessions={this.filterSessions()}/>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return (
            <section className="md:py-16 md:my-0 bg-accent h-full">
                <div className="container mx-auto py-8 px-4 md:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-6">
                        <div className="col-span-3">
                            <img className="rounded-lg shadow-md w-full"
                                 alt={this.props.hoopSpot.name}
                                 src={this.props.hoopSpot.image}/>
                        </div>
                        <div className="col-span-2 relative">
                            <h1 className="text-3xl tracking-wide leading-10 font-semibold">{this.props.hoopSpot.name}</h1>
                            <div className="mt-3 text-gray-700 font-normal space-y-2">
                                <span className="flex">
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"/>
                                    </svg>
                                    {this.props.hoopSpot.full_address}
                                </span>

                                <span className="flex">
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                    </svg>
                                    {this.props.hoopSpot.members?.length} &middot; Public
                                </span>

                                <span className="flex md:hidden font-semibold">
                                    Share:
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor" viewBox="0 0 50 50"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                    </svg>
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </span>
                            </div>

                            <div className="md:block hidden absolute inset-x-0 bottom-0 font-semibold">
                                <span className="flex items-center">
                                    Share:
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor" viewBox="0 0 50 50"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                    </svg>
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <HoopSpotTab selectTab={this.selectTab} selected={this.state.selectedTab}/>
                                <div className="-mb-px space-x-3 hidden md:flex">
                                    <span className="inline-flex rounded-md shadow-sm">
                                        <button type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary  focus:outline-none focus:shadow-outline-orange transition ease-in-out duration-150">
                                            Join
                                            <svg className="-mr-0.5 ml-2 h-4 w-4" fill="currentColor"
                                                 viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                      clipRule="evenodd"/>
                                            </svg>

                                        </button>
                                    </span>

                                    <span className="inline-flex">
                                        <button type="button"
                                                className="inline-flex items-center px-1 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 focus:outline-none transition ease-in-out duration-150">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                            </svg>
                                        </button>
                                    </span>

                                    <span className="inline-flex rounded-md shadow-sm hidden">
                                        <button type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150">
                                            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor"
                                                 viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            Add Session
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto py-8 px-4 md:px-0">
                    {
                        // Show Members
                        this.state.selectedTab === HoopSpotTabEnum.members ? (
                            this.getMemberContainer()
                        ) : null
                    }

                    {
                        // Show sessions
                        this.state.selectedTab === HoopSpotTabEnum.sessions ? (
                            this.getSessionsContainer()
                        ): null
                    }

                    {
                        // Show discussion
                        this.state.selectedTab === HoopSpotTabEnum.discussions ? (
                            <CommentList hoopSpot={this.props.hoopSpot}/>
                        ): null
                    }
                </div>

            </section>
        );
    }
}
