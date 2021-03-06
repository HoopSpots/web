import React, {FunctionComponent, useContext} from 'react'
import {HamburgerButton} from '../button/HamburgerButton.';
import {HeaderButton} from '../button/HeaderButton.';
import Link from 'next/link';
import UserContext from '../context/UserContext';

const Header: FunctionComponent = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="z-0 relative bg-white">
            <div className="relative z-10 shadow">
                <div
                    className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
                    <div>
                        <Link href="/">
                            <span className="flex text-primary text-2xl font-base cursor-pointer">
                                HoopSpots
                            </span>
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <HamburgerButton/>
                    </div>
                    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between md:space-x-12">

                    </div>
                    <div className="items-center space-x-8 hidden md:flex">
                        {
                            user == null ? (
                                <>
                                    <HeaderButton text="Sign In" to="/login" type="secondary"/>
                                    <div className="inline-flex rounded-md shadow-sm">
                                        <HeaderButton text="Sign Up" to="/register" type="primary"/>
                                    </div>
                                </>
                            ): null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
