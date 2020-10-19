import {FunctionComponent} from 'react';

const NavButton: FunctionComponent = (props) => {
    return (
        <div>{props.children}</div>
    );
};

export default NavButton;
