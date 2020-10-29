import {FunctionComponent} from 'react';

const Divider: FunctionComponent = () => {
    return (
        <div className="hidden sm:block">
            <div className="py-5">
                <div className="border-t border-gray-200" />
            </div>
        </div>
    )
};

export default Divider;
