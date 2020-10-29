import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {SortMemberEnum} from '../../interfaces/enums/SortMemberEnum';
import {HoopSpotTabEnum} from '../../interfaces/enums/HoopSpotTabEnum';
import {HoopSpotTab} from '../tab/HoopSpotTab';
import FullMemberList from '../list/FullMemberList';
import {SortMemberDropdown} from '../dropdown/SortMemberDropdown';
import {FullHoopSessionsList} from '../list/FullHoopSessionsList';
import {DateFilterEnum} from '../../interfaces/enums/DateFilterEnum';
import dayjs from 'dayjs';
import CommentList from '../list/CommentList';
import AddButton from '../button/AddButton';
import UserContext from '../context/UserContext';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {Notyf} from 'notyf';
import {useRouter} from 'next/router';
import {MemberListTypeEnum} from '../../interfaces/enums/MemberListTypeEnum';
import LeaveButton from '../button/LeaveButton';
import HoopSpotColSkeleton from '../skeleton/HoopSpotColSkeleton';
import Link from 'next/link';
import HoopSpotImageCard from '../card/HoopSpotImageCard';

type HoopSpotSectionProps = {
    hoopSpot: HoopSpot
}


const HoopSpotSection: FunctionComponent<HoopSpotSectionProps> = (props) => {
    // const [sortBy, setSortBy] = useState<SortMemberEnum.alphabetical | SortMemberEnum.joined>(SortMemberEnum.alphabetical);
    const { user } = useContext(UserContext);
    const router = useRouter();
    const restService: RestService = new RestService();
    const [searchInput, setSearchInput] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions>(HoopSpotTabEnum.members);
    const [members] = useState<User[] | null | undefined>(props.hoopSpot.members);
    const [filterSessionsByDate, setFilterSessionsByDate] = useState<DateFilterEnum.past | DateFilterEnum.upcoming>(DateFilterEnum.upcoming);
    const [isMember, setIsMember] = useState<boolean|undefined>(undefined);
    const [nearbyHoopSpots, setNearbyHoopSpots] = useState<HoopSpot[]>([]);
    const [loadedNearbyHoopSpots, setLoadedNearbyHoopSpots] = useState<boolean>(false);
    useEffect(() => {
        if (isMember === undefined) {
            setIsMember(checkIfMember);
        }

        if (!loadedNearbyHoopSpots) {
            getNearbyHoopSpots();
        }
    });

    const selectSortMember = (option: SortMemberEnum.joined | SortMemberEnum.alphabetical) => {
        console.log(option)
    };

    const selectTab = (tab: HoopSpotTabEnum.discussions | HoopSpotTabEnum.members | HoopSpotTabEnum.sessions) => {
        setSelectedTab(tab);
    };

    const searchMembers = () => {
        if (searchInput === '') {
            return members;
        }

        return members?.filter(member => {
            if (member.name.toLowerCase().includes(searchInput.toLowerCase()) || member.email.toLowerCase().includes(searchInput.toLowerCase())) {
                return member
            }
        });
    };

    const getNearbyHoopSpots = () => {
        restService.makeHttpRequest(`hoopspot/${props.hoopSpot.slug}/nearby`, `GET`)
            .then((res: ResponseFactory<HoopSpot[]>) => {
                setNearbyHoopSpots(res.data);
            });
        setLoadedNearbyHoopSpots(true);
    };

    const fbShareLink = () => {
        if (typeof(window) !== 'undefined') {
            return `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        }
    };

    const twitterShareLink = () => {
        if (typeof(window) !== 'undefined') {
            return `https://twitter.com/share?url=${window.location.href}`;
        }
    };

    const filterSessions = () => {
        return props.hoopSpot.hoop_sessions?.filter(hoopSession => {
            if (filterSessionsByDate === DateFilterEnum.past) {
                return dayjs().isAfter(dayjs(hoopSession.end_time))
            }

            return dayjs().isBefore(dayjs(hoopSession.end_time));
        })
    };

    const checkIfMember = () => {
        if (user == null) {

            return false;
        }

        return members?.filter(member => {
            return member.uuid === user.uuid;
        }).length === 1;
    };

    const joinHoopSpot = async () => {
        const notyf = new Notyf();
        if (user == null) {
            await router.push(`/login?ref=${encodeURIComponent(window.location.href)}`);
            return ;
        }

        restService.makeHttpRequest(`hoopspot/${props.hoopSpot.slug}/join`, `POST`).then((res: ResponseFactory<null>) => {
            setIsMember(true);

            notyf.success(res.message);
        }).catch(error => {
            notyf.error(error.response.data.message)
        })
    };

    const leaveHoopSpot = async () => {
        const notyf = new Notyf();
        if (user == null) {
            await router.push(`/login?ref=${encodeURIComponent(window.location.href)}`);
            return ;
        }

        restService.makeHttpRequest(`hoopspot/${props.hoopSpot.slug}/leave`, `POST`).then((res: ResponseFactory<null>) => {
            setIsMember(false);
            notyf.success(res.message);
        }).catch(error => {
            notyf.error(error.response.data.message)
        })
    };

    const getMemberContainer = () => {
        return (
            <div className="bg-white rounded-md shadow-md py-8 px-4 w-full md:max-w-4xl mx-auto">
                <div className="flex justify-between relative">
                    <h3 className="font-medium tracking-wide text-2xl text-gray-800 inline-flex items-center">
                        Members ({props.hoopSpot.members?.length})
                    </h3>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="font-base inline-flex tracking-wide text-sm focus:outline-none text-gray-600">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
                        </svg>
                        Sort
                    </button>
                    <SortMemberDropdown selectSortOption={selectSortMember}
                                        showDropdown={showDropdown}/>
                </div>
                <div className="flex border-b">
                    <input id="email"
                           onChange={event => setSearchInput(event.target.value)}
                           className="form-input block w-full my-4 px-2 py-3 text-md sm:leading-5 border-gray-100 rounded-lg shadow-md border-2 focus:outline-none"
                           placeholder="Search for Members"/>
                </div>
                <FullMemberList listType={MemberListTypeEnum.hoopspots} members={searchMembers()}/>
            </div>
        )
    };

    const getSessionsContainer = () => {
        return (
            <div className="md:max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Select between upcoming or past sessions */}
                    <div className="hidden md:block col-span-1">
                        <nav className="bg-white shadow rounded-lg border-gray-50">
                            <span
                                onClick={() => setFilterSessionsByDate(DateFilterEnum.upcoming)}
                                className={`cursor-pointer rounded-t group flex items-center px-3 py-2 leading-5 focus:outline-none transition ease-in-out duration-150  ${filterSessionsByDate === DateFilterEnum.upcoming ? 'border-r-4 border-primary text-md font-semibold text-primary' : 'text-sm font-medium text-gray-900 hover:text-gray-600'}`}>
                                Upcoming
                            </span>
                            <span
                                onClick={() => setFilterSessionsByDate(DateFilterEnum.past)}
                                className={`cursor-pointer rounded-t group flex items-center px-3 py-2 leading-5 focus:outline-none transition ease-in-out duration-150  ${filterSessionsByDate === DateFilterEnum.past ? 'border-r-4 border-primary text-md font-semibold text-primary' : 'text-sm font-medium text-gray-900 hover:text-gray-600'}`}>
                                Past
                            </span>
                        </nav>
                    </div>
                    <select className="block md:hidden form-select col-span-1 w-full" onChange={e => setFilterSessionsByDate(e.target.value as DateFilterEnum)} value={filterSessionsByDate} >
                        <option value={DateFilterEnum.upcoming}>Upcoming</option>
                        <option value={DateFilterEnum.past}>Past</option>
                    </select>
                    <div className="col-span-1 md:col-span-2">
                        <FullHoopSessionsList hoopSessions={filterSessions()}/>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <section className="md:py-16 md:my-0 bg-accent h-full">
            <div className="container mx-auto py-8 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-6">
                    <div className="col-span-3">
                        <img className="rounded-lg shadow-md w-full"
                             alt={props.hoopSpot.name}
                             src={props.hoopSpot.image}/>
                    </div>
                    <div className="col-span-2 relative">
                        <h1 className="text-3xl tracking-wide leading-10 font-semibold">{props.hoopSpot.name}</h1>
                        <div className="mt-3 text-gray-700 font-normal space-y-2">
                            <span className="flex">
                                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"/>
                                </svg>
                                {props.hoopSpot.full_address}
                            </span>

                            <span className="flex">
                                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                </svg>
                                {props.hoopSpot.members?.length} &middot; Public
                            </span>

                            <span className="flex md:hidden font-semibold">
                                Share:
                                <a href={fbShareLink()} target="_blank">
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 50 50"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                    </svg>
                                </a>
                                <a href={twitterShareLink()} target="_blank">
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                            </span>
                        </div>

                        <div className="md:block hidden absolute inset-x-0 bottom-0 font-semibold">
                            <span className="flex items-center">
                                Share:
                                <a href={fbShareLink()} target="_blank">
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 50 50"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                    </svg>
                                </a>
                                <a href={twitterShareLink()} target="_blank">
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <HoopSpotTab selectTab={selectTab} selected={selectedTab}/>
                            <div className="-mb-px space-x-3 hidden md:flex">
                                <span className="inline-flex rounded-md shadow-sm">
                                    {
                                        isMember ? (
                                            <LeaveButton onClick={() => leaveHoopSpot()}>Unfollow</LeaveButton>
                                        ): (
                                            <AddButton onClick={() => joinHoopSpot()}>Follow</AddButton>
                                        )
                                    }
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="col-span-2">
                        {
                            // Show Members
                            selectedTab === HoopSpotTabEnum.members ? (
                                getMemberContainer()
                            ) : null
                        }

                        {
                            // Show sessions
                            selectedTab === HoopSpotTabEnum.sessions ? (
                                getSessionsContainer()
                            ) : null
                        }

                        {
                            // Show discussion
                            selectedTab === HoopSpotTabEnum.discussions ? (
                                <CommentList hoopSpot={props.hoopSpot}/>
                            ) : null
                        }
                    </div>
                    <div className="hidden md:block col-span-1 flex">
                        <h3 className="tracking-tight font-medium text-2xl text-gray-700 text-center mb-4">
                            Nearby Hoop Spots
                        </h3>
                        <div className="grid gap-5 justify-center items-center">
                            {
                                nearbyHoopSpots.length > 0 ? nearbyHoopSpots.map(nearbyHoopSpot => (
                                    <Link href={`/hoopspot/${nearbyHoopSpot.slug}`} key={nearbyHoopSpot.uuid}>
                                        <div className="grid-row-1">
                                            <HoopSpotImageCard hoopSpot={nearbyHoopSpot}/>
                                        </div>
                                    </Link>
                                )): [...Array(6)].map((_i, index) => (
                                    <div className="grid-row-1" key={index}>
                                        <HoopSpotColSkeleton/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
};

export default HoopSpotSection;
