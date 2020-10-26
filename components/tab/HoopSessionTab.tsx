import React, {FunctionComponent} from 'react';
import {HoopSessionTabEnum} from '../../interfaces/enums/HoopSessionTabEnum';

type HoopSessionTabProps = {
    selectTab: (tab: HoopSessionTabEnum.comments | HoopSessionTabEnum.attendees) => void;
    selected: HoopSessionTabEnum.comments | HoopSessionTabEnum.attendees;
}


const HoopSessionTab: FunctionComponent<HoopSessionTabProps> = (props) => {
    const select = (tab: HoopSessionTabEnum.comments | HoopSessionTabEnum.attendees) => {
        props.selectTab(tab);
    };

    return (
        <nav className="flex -mb-px">
            <button
                onClick={() => select(HoopSessionTabEnum.attendees)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none ${props.selected === HoopSessionTabEnum.attendees ? "text-primary border-primary": "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"}`}>
                <svg
                    className={`-ml-0.5 mr-2 h-5 w-5 ${props.selected === HoopSessionTabEnum.attendees ? 'text-primary': 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'}`}
                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                <span>Attendees</span>
            </button>
        </nav>
    );
};

export default HoopSessionTab;
