import React, {Component} from 'react'
import {HamburgerButton} from '../button/HamburgerButton.';
import {HeaderButton} from '../button/HeaderButton.';
import Link from 'next/link';

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
                            <Link href="/">
                                <span className="flex text-primary text-2xl font-base cursor-pointer">
                                    HoopSpots 🏀📍
                                </span>
                            </Link>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <HamburgerButton/>
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between md:space-x-12">

                        </div>
                        <div className="items-center space-x-8 hidden md:flex">
                            {!this.props.isLoggedIn ? (
                                <HeaderButton text="Sign In" to="#" type="secondary"/>
                            ): null}
                            <div className="inline-flex rounded-md shadow-sm">
                                {!this.props.isLoggedIn ? (
                                    <HeaderButton text="Sign Up" to="#" type="primary"/>
                                ): null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
