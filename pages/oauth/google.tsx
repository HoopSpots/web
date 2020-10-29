import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import UserContext from '../../components/context/UserContext';

const Google: FunctionComponent = () => {
    const router = useRouter();
    const {authWithGoogle, user} = useContext(UserContext);
    const [sentCode, setSentCode] = useState<boolean>(false);

    useEffect(() => {
        if (!sentCode) {
            if (router.query.code) {
                if (authWithGoogle){
                    authWithGoogle(router.query.code as string);
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
            <h1 className="tracking-tight text-xl p-3">Authenticating via Google...</h1>
        </div>
    );
};

export default Google;
