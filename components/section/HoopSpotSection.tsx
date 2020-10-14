import React, {Component} from 'react';
import {HoopSpotHeader} from '../header/HoopSpotHeader';

type HoopSpotSectionProps = {
    hoopSpot: HoopSpot
}

export class HoopSpotSection extends Component<HoopSpotSectionProps>{
    constructor(props: HoopSpotSectionProps) {
        super(props);
    }

    render() {
        return (
            <section className="md:py-16 md:my-0 bg-accent">
                <div className="container mx-auto">
                    <HoopSpotHeader hoopSpot={this.props.hoopSpot}/>

                    <img className="w-full h-auto rounded-md mt-2 bg-cover" src={this.props.hoopSpot.image}
                         alt="image"/>

                    <div className="mt-2">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex">
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-xs md:text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    Members
                                </a>
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-xs md:text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    Sessions
                                </a>
                                <a href="#"
                                   className="w-1/3 py-4 px-1 text-center border-b-2 border-primary font-medium text-xs md:text-sm leading-5 text-primary focus:outline-none"
                                   aria-current="page">
                                    Ratings
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
