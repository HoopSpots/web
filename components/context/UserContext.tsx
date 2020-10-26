import {createContext} from 'react';
import {UserContextProps} from '../../interfaces/context/UserContextProps';

const userContextProps: UserContextProps = {
    user: null,
    signIn: undefined,
    signOut: undefined,
    signUp: undefined,
    signUpWithFacebook: undefined,
    signUpWithGoogle: undefined
};

const UserContext = createContext(userContextProps);

export default UserContext;
