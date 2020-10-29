import React, {FunctionComponent, useContext, useEffect} from 'react';
import ProfileSettingsForm from '../form/ProfileSettingsForm';
import Divider from '../divider/Divider';
import PersonalSettingsForm from '../form/PersonalSettingsForm';
import UserContext from '../context/UserContext';
import NotificationSettingsForm from '../form/NotificationSettingsForm';
import {useRouter} from 'next/router';

const SettingsSection: FunctionComponent = () => {
    const {isAuthenticated} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === false) {
            router.push(`/login?ref=${encodeURIComponent(window.location.href)}`);
        }
    });

    return (
        <section className="py-8 md:py-16 md:my-0 bg-accent h-full">
            <div className="container mx-auto">
                <ProfileSettingsForm/>
                <Divider/>
                <PersonalSettingsForm/>
                <Divider/>
                <NotificationSettingsForm/>
            </div>
        </section>
    );
};

export default SettingsSection;
