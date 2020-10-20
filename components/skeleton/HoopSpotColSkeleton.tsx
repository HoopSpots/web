import React, {FunctionComponent} from 'react';

const HoopSpotColSkeleton: FunctionComponent = () => {
    return (
        <div
            className="max-w-xs rounded-lg overflow-hidden shadow-lg relative bg-black cursor-pointer animate-pulse">
            <div className="bg-gray-400 h-56 object-cover block w-screen"/>
            <div className="px-6 py-4 absolute left-0 bottom-0 space-y-3">
                <div className="w-32 rounded h-4 bg-gray-500"/>
                <div className="w-16 rounded h-4 bg-gray-500"/>
            </div>
        </div>
    );
}

export default HoopSpotColSkeleton;
