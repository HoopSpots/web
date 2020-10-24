import React, {Component} from 'react';
import {SortMemberEnum} from '../../interfaces/enums/SortMemberEnum';

type SortMemberDropdownProps = {
    selectSortOption: (sort: SortMemberEnum.joined | SortMemberEnum.alphabetical) => void;
    showDropdown: boolean;
}

type SortMemberDropdownState = {}

export class SortMemberDropdown extends Component<SortMemberDropdownProps, SortMemberDropdownState> {
    constructor(props: SortMemberDropdownProps) {
        super(props);
    }

    select = (sort: SortMemberEnum.joined | SortMemberEnum.alphabetical) => {;
        // var lang = this.dropdown.value;
        this.props.selectSortOption(sort)
    };


    render() {
        return (
            <div className={`origin-top-right absolute right-0 mt-8 w-32 rounded-md shadow-lg ${this.props.showDropdown ? "transform opacity-100 scale-100" : "transform opacity-0 scale-95"}`}>
                <div className="rounded-md bg-white shadow-xs">
                    <div className="py-1" role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        <button onClick={() => this.select(SortMemberEnum.joined)}
                                className={`block w-full px-4 py-2 text-xs leading-5 text-orange-500 hover:bg-gray-100 hover:text-orange-400 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                                role="menuitem">Joined On</button>
                        <button onClick={() => this.select(SortMemberEnum.alphabetical)}
                                className="block w-full px-4 py-2 text-xs leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                role="menuitem">Alphabetical</button>
                    </div>
                </div>
            </div>
        );
    }
}
