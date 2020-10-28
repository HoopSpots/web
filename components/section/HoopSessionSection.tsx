import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import UserContext from '../context/UserContext';
import {useRouter} from 'next/router';
import {Notyf} from 'notyf';
import {RestService} from '../../services/RestService';
import Link from 'next/link';
import AddButton from '../button/AddButton';
import LeaveButton from '../button/LeaveButton';
import FullMemberList from '../list/FullMemberList';
import {MemberListTypeEnum} from '../../interfaces/enums/MemberListTypeEnum';
import HoopSpotColSkeleton from '../skeleton/HoopSpotColSkeleton';
import HoopSessionImageCard from '../card/HoopSessionImageCard';
import {ResponseFactory} from '../../interfaces/ResponseFactory';


type HoopSessionstSectionProps = {
    hoopSession: HoopSession
}

dayjs.extend(localizedFormat);

const HoopSessionSection: FunctionComponent<HoopSessionstSectionProps> = (props) => {
    const {user} = useContext(UserContext);
    const router = useRouter();
    const [searchInput, setSearchInput] = useState<string>('');
    const restService: RestService = new RestService();
    const [members] = useState<User[] | null | undefined>(props.hoopSession.members);
    const [isAttending, setIsAttending] = useState<boolean | undefined>(undefined);
    const [nearbyHoopSessions, setNearbyHoopSessions] = useState<HoopSession[]>([]);
    const [loadedNearbyHoopSessions, setLoadedNearbyHoopSessions] = useState<boolean>(false);

    useEffect(() => {
        if (isAttending === undefined) {
            setIsAttending(checkIfAttending);
        }

        if (!loadedNearbyHoopSessions) {
            getNearbyHoopSessions();
        }
    });

    const checkIfAttending = () => {
        if (user == null) {

            return false;
        }

        return members?.filter(member => {
            return member.uuid === user.uuid;
        }).length === 1;
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

    const fbShareLink = () => {
        if (typeof (window) !== 'undefined') {
            return `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        }
    };

    const twitterShareLink = () => {
        if (typeof (window) !== 'undefined') {
            return `https://twitter.com/share?url=${window.location.href}`;
        }
    };

    const respondToHoopSession  = async (response: boolean)  => {
        const notyf = new Notyf();
        if (user == null) {
            await router.push(`/login?ref=${encodeURIComponent(window.location.href)}`);
            return;
        }

        restService.makeHttpRequest(`hoopsession/${props.hoopSession.uuid}`, `POST`, {is_going: response})
            .then((res: ResponseFactory<null>) => {
                notyf.success(res.message);
                setIsAttending(response);
            });
    };

    const getNearbyHoopSessions = () => {
        restService.makeHttpRequest(`hoopsession/${props.hoopSession.uuid}/nearby`, `GET`)
            .then((res: ResponseFactory<HoopSession[]>) => {
                setNearbyHoopSessions(res.data);
            });
        setLoadedNearbyHoopSessions(true);
    };

    const getAttendeesContainer = () => {
        return (
            <div className="bg-white rounded-md shadow-md py-8 px-4 w-full md:max-w-4xl mx-auto">
                <div className="flex justify-between relative">
                    <h3 className="font-medium tracking-wide text-2xl text-gray-800 inline-flex items-center">
                        {dayjs(props.hoopSession.start_time).isBefore(dayjs()) ? 'Attended' : 'Attending'} ({props.hoopSession.members?.length})
                    </h3>
                </div>
                <div className="flex border-b">
                    <input id="email"
                           onChange={event => setSearchInput(event.target.value)}
                           className="form-input block w-full my-4 px-2 py-3 text-md sm:leading-5 border-gray-100 rounded-lg shadow-md border-2 focus:outline-none"
                           placeholder="Search Attendees"/>
                </div>
                <FullMemberList members={searchMembers()} listType={MemberListTypeEnum.hoopsessions}/>
            </div>
        )
    };

    return (
        <section className="py-8 md:py-16 md:my-0 bg-accent h-full">
            <div className="container mx-auto py-8 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-6">
                    <div className="col-span-3">
                        <img className="rounded-lg shadow-md w-full"
                             alt={props.hoopSession.hoopspot?.name}
                             src={props.hoopSession.hoopspot?.image}/>
                    </div>
                    <div className="col-span-2 relative">
                        <h4 className="tracking-tighter font-base text-lg md:text-xl text-primary">{dayjs(props.hoopSession.start_time).format('LL')}</h4>
                        <h1 className="tracking-wide font-extrabold text-2xl md:text-4xl">{dayjs(props.hoopSession.start_time).format('LT')} - {dayjs(props.hoopSession.end_time).format('LT')}</h1>
                        <div className="mt-3 text-gray-700 font-normal space-y-2">
                            <a href={`http://maps.google.com/?q=${props.hoopSession.hoopspot?.full_address}`}
                               target="_blank"
                               className="flex underline text-sm md:text-md">
                                {/* location icon */}
                                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"/>
                                </svg>
                                {props.hoopSession.hoopspot?.full_address}
                            </a>

                            <span className="flex text-sm md:text-md">
                                {/* users icon */}
                                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                </svg>
                                {props.hoopSession.members?.length} &middot; {dayjs(props.hoopSession.start_time).isBefore(dayjs()) ? 'Attended' : 'Attending'}
                            </span>

                            <Link href={`/hoopspot/${props.hoopSession.hoopspot?.slug}`}>
                                <a className="flex underline text-sm md:text-md">
                                    {/* building icon */}
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    {props.hoopSession.hoopspot?.name}
                                </a>
                            </Link>

                            <span className="flex md:hidden font-semibold">
                                Share:
                                <a href={fbShareLink()} target="_blank">
                                    {/*fb icon*/}
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 50 50"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                    </svg>
                                </a>
                                <a href={twitterShareLink()} target="_blank">
                                    {/*twitter icon*/}
                                    <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                            </span>

                            <div className="flex md:hidden">
                                {
                                    isAttending ? (
                                        <LeaveButton onClick={() => respondToHoopSession(false)}>Back Out</LeaveButton>
                                    ) : (
                                        <AddButton onClick={() => respondToHoopSession(true)}>Attend</AddButton>
                                    )
                                }
                            </div>
                        </div>

                        <div className="md:block hidden absolute inset-x-0 bottom-0 font-semibold">
                            <div className="flex justify-between">
                                <span className="flex items-center">
                                    Share:
                                    <a href={fbShareLink()} target="_blank">
                                        {/*fb icon*/}
                                        <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                             viewBox="0 0 50 50"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
                                        </svg>
                                    </a>
                                    <a href={twitterShareLink()} target="_blank">
                                        {/*twitter icon*/}
                                        <svg className="w-5 h-5 mx-1 text-gray-600" fill="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                </span>
                                {
                                    isAttending ? (
                                        <LeaveButton onClick={() => respondToHoopSession(false)}>Back Out</LeaveButton>
                                    ) : (
                                        <AddButton onClick={() => respondToHoopSession(true)}>Attend</AddButton>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="border-b border-gray-200"/>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="col-span-2">
                        {getAttendeesContainer()}
                    </div>
                    <div className="hidden md:block col-span-1 flex">
                        <h3 className="tracking-tight font-medium text-2xl text-gray-700 text-center mb-4">
                            Nearby Hoop Sessions
                        </h3>
                        <div className="grid gap-5 justify-center items-center">
                            {
                                nearbyHoopSessions.length > 0 ? nearbyHoopSessions.map(nearbyHoopSession => (
                                    <Link href={`/hoopsession/${nearbyHoopSession.uuid}`} key={nearbyHoopSession.uuid}>
                                        <div className="grid-row-1">
                                            <HoopSessionImageCard hoopSession={nearbyHoopSession}/>
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
    );
};

export default HoopSessionSection;
