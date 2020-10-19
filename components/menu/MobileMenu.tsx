import {FunctionComponent} from 'react';
import {useRouter} from 'next/router';

type MobileMenuProps = {
    active: boolean;
}

const MobileMenu: FunctionComponent<MobileMenuProps> = (props) => {
    const router = useRouter();

    return (
        <div className={`sm:hidden ${props.active ? "block" : "hidden"}`}>
            <div className="pt-2 pb-4">
                <a href="#"
                   className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${router.asPath === '/' ? "text-primary bg-accent focus:shadow-outline-orange border-primary" : "focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-transparent"}`}>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Explore
                </a>
                <a href="#"
                   className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${router.asPath === '/hoopspots' ? "text-primary bg-accent focus:shadow-outline-orange border-primary" : "focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-transparent"}`}>
                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Spots
                </a>
                <a href="#" className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${router.asPath === '/hoopsessions' ? "text-primary bg-accent focus:shadow-outline-orange border-primary" : "focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 border-transparent"}`}>
                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Sessions
                </a>
            </div>
        </div>
    );
};

export default MobileMenu;
