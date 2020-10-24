import React, {FunctionComponent} from 'react';

type LeaveButtonProps = {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

const LeaveButton: FunctionComponent<LeaveButtonProps> = ({children, onClick}) => {
    return (
        <button type="button"
                onClick={onClick}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150">
            {children}
            <svg className="-mr-0.5 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"/>
            </svg>
        </button>
    )
};

export default LeaveButton;
