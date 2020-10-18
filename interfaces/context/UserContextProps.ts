import {LoginRequest} from '../requests/LoginRequest';

export interface UserContextProps {
    user: User | null;
    signIn?: ((request: LoginRequest) => void) | undefined;
    signOut?: (() => void) | null;
}
