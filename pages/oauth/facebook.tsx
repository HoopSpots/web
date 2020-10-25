import React, {FunctionComponent, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import UserContext from '../../components/context/UserContext';

const Facebook: FunctionComponent = () => {
    const router = useRouter();
    const {signUpWithFacebook} = useContext(UserContext);
    useEffect(() => {
        if (process) {
            if (router.query.code) {
                if (signUpWithFacebook){
                    signUpWithFacebook(router.query.code as string);
                }
            }else {
                // push somewhere else
            }
        }
    });

    return (
        <div className="container">
            <h1 className="tracking-tight text-xl p-3">Logging in via Facebook...</h1>
        </div>
    )
};

export default Facebook;
