import React, {FunctionComponent} from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type HoopSessionImageCardProps = {
    hoopSession: HoopSession
}

dayjs.extend(localizedFormat);

const HoopSessionImageCard: FunctionComponent<HoopSessionImageCardProps> = (props) => {
    return (
        <div className="max-w-full md:max-w-xs rounded-lg overflow-hidden shadow-lg relative bg-black cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">
            <img className="w-full h-56 object-cover opacity-50" src={props.hoopSession.hoopspot?.image} alt={props.hoopSession.hoopspot?.name} />
            <div className="px-6 py-4 absolute left-0 top-0">
                <h6 className="font-semibold text-white tracking-tighter text-sm">{dayjs(props.hoopSession.start_time).format('LL')}</h6>
                <h4 className="font-semibold text-white tracking-tighter text-lg">{dayjs(props.hoopSession.start_time).format('LT')} - {dayjs(props.hoopSession.end_time).format('LT')}</h4>
            </div>

            <div className="px-6 py-4 absolute left-0 bottom-0 space-y-1">

                <p className="font-light text-white tracking-tight flex items-center text-sm">
                    {/* users icon */}
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                        </path>
                    </svg>
                   {props.hoopSession.members?.length} &middot; {dayjs(props.hoopSession.start_time).isBefore(dayjs()) ? 'Attended' : 'Attending'}
                </p>

                <p className="font-light text-white tracking-tight flex items-center text-sm">
                    {/* location icon */}
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"/>
                    </svg>
                    {props.hoopSession.hoopspot?.name}
                </p>

            </div>
        </div>
    );
};

export default HoopSessionImageCard;
