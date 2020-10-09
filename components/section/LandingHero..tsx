import React, {Component} from 'react'

type MyProps = {};
type MyState = {};

export class LandingHero extends Component<MyProps, MyState> {
    render() {
        return (
            <section className="md:pt-16 md:my-0 bg-accent">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:order-last mb-4 md:mb-0">
                        <img className="object-cover object-center"
                             src="/images/basketball-illustration.svg" alt="basketball illustration"/>
                    </div>
                    <div
                        className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1
                            className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
                            Start Hooping with <br/> <span className="text-primary"> Hoop Spots</span> 🏀📍
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-gray-700 text-lg sm:text-xl md:mt-5 md:max-w-3xl">
                            Hoop Spots allows you to find hoop sessions near you. Invite your friends to a hoop session and
                            start hooping today!
                        </p>
                        <div className="mt-10 space-x-3">
                            <div className="inline-flex rounded-full shadow-lg">
                                <button type="button"
                                        className="inline-flex items-center px-8 py-3 border border-transparent text-base leading-6 font-semibold rounded-full  text-primary bg-white uppercase focus:outline-none focus:shadow-outline-orange transition ease-in-out duration-150">
                                    Join Hoop Spots
                                </button>
                            </div>
                            <div className="inline-flex rounded-full shadow-lg">
                                <button type="button"
                                        className="inline-flex items-center px-8 py-3 border border-transparent text-base leading-6 font-semibold rounded-full text-white bg-primary uppercase focus:outline-none focus:shadow-outline-orange transition ease-in-out duration-150">
                                    Invite Friends
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
