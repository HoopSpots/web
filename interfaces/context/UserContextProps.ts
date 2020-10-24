import {LoginRequest} from '../requests/LoginRequest';

export interface UserContextProps {
    user: User | null;
    signIn?: ((request: LoginRequest, nextUrl?: string) => void) | undefined;
    signOut?: (() => void) | null;
}
