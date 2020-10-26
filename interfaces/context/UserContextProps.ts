import {LoginRequest} from '../requests/LoginRequest';
import {RegisterRequest} from '../requests/RegisterRequest';

export interface UserContextProps {
    user: User | null;
    signIn?: ((request: LoginRequest, nextUrl?: string) => void) | undefined;
    signOut?: (() => void) | null;
    signUp?: ((request: RegisterRequest, nextUrl?: string) => void) | undefined;
    signUpWithFacebook?: ((code: string) => void) | undefined;
}
