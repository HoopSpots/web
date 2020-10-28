import {createContext} from 'react';
import {UserContextProps} from '../../interfaces/context/UserContextProps';

const userContextProps: UserContextProps = {
    user: null,
    updateUser: null,
    isAuthenticated: undefined,
    signIn: undefined,
    signOut: undefined,
    signUp: undefined,
    authWithFacebook: undefined,
    authWithGoogle: undefined
};

const UserContext = createContext(userContextProps);

export default UserContext;
