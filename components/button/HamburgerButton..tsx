import React, {Component} from 'react'

type MyProps = {

};
type MyState = {

};

export class HamburgerButton extends Component<MyProps, MyState> {
    render() {
        return (
            <button type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        );
    }
}
