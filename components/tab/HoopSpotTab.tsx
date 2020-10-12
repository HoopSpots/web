import React, {Component} from 'react';

type MyProps = {}

type MyState = {
    selected: string;
};

const options = {
    members: 'members',
    sessions: 'sessions',
    ratings: 'ratings'
}

export class HoopSpotTab extends Component<MyProps, MyState>{
    state = {
        selected: 'members'
    };

    render() {
        return (
            <nav className="-mb-px flex">
                <button onClick={() => this.setState({selected: options.members})}
                        className={
                            "w-1/3 py-4 px-1 text-center border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none" +
                            (this.state.selected === options.members) ?
                                'text-primary border-primary':
                                'text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
                        }>
                    Members
                </button>
                <button onClick={() => this.setState({selected: options.sessions})}
                        className={
                            "w-1/3 py-4 px-1 text-center border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none" +
                            (this.state.selected === options.sessions) ? 'text-primary border-primary': 'text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
                        }>
                    Sessions
                </button>
                <button onClick={() => this.setState({selected: options.ratings})}
                   className={
                       "w-1/3 py-4 px-1 text-center border-b-2 font-medium text-xs md:text-sm leading-5 focus:outline-none" +
                       (this.state.selected === options.ratings) ?
                           'text-primary border-primary':
                           'text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
                   }
                   aria-current="page">
                    Ratings
                </button>
            </nav>
        );
    }
}
