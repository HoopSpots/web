import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import UserContext from '../../components/context/UserContext';

const Facebook: FunctionComponent = () => {
    const router = useRouter();
    const {signUpWithFacebook, user} = useContext(UserContext);
    const [sentCode, setSentCode] = useState<boolean>(false);
    useEffect(() => {
        if (!sentCode) {
            if (router.query.code) {
                if (signUpWithFacebook){
                    signUpWithFacebook(router.query.code as string);
                    setSentCode(true);
                }
            }else {
                // push somewhere else
            }
        }

        if (user) {
            router.push('/');
        }
    });

    return (
        <div className="container">
            <h1 className="tracking-tight text-xl p-3">Logging in via Facebook...</h1>
        </div>
    )
};

export default Facebook;
