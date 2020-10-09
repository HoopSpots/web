import React, {Component} from 'react'
import {HamburgerButton} from '../button/HamburgerButton.';
import {HeaderButton} from '../button/HeaderButton.';

type MyProps = {
    isLoggedIn: boolean
};
type MyState = {};

export class Header extends Component<MyProps, MyState> {
    render() {
        return (
            <div className="z-0 relative bg-white">
                <div className="relative z-10 shadow">
                    <div
                        className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
                        <div>
                            <a href="/" className="flex text-primary text-2xl font-base">
                                HoopSpots 🏀📍
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <HamburgerButton/>
                        </div>
                        <div className="flex items-center space-x-8">
                            <HeaderButton text="Sign In" to="#" type="secondary"/>
                            <div className="inline-flex rounded-md shadow-sm">
                                <HeaderButton text="Sign Up" to="#" type="primary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
