import React, {FunctionComponent, useEffect, useState} from 'react';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import HoopSessionListCard from '../card/HoopSessionListCard';
import ListCardSkeleton from '../skeleton/ListCardSkeleton';

dayjs.extend(localizedFormat);

const PageHoopSessionsList: FunctionComponent = () => {
    const [hoopSessions, setHoopSessions] = useState<HoopSession[]>([]);
    const restService: RestService = new RestService();

    useEffect(() => {
        if (hoopSessions.length === 0) {
            restService.makeHttpRequest(`hoopsessions`, `GET`).then((res: ResponseFactory<HoopSession[]>) => {
                setHoopSessions(res.data);
            });
        }
    }, []);

    return (
        <ul className="space-y-4 w-full">
            {
                hoopSessions.length > 0 ? hoopSessions.map(hoopSession => (
                    <HoopSessionListCard hoopSession={hoopSession} key={hoopSession.uuid}/>
                )): [...Array(6)].map((_i, index) => (
                    <ListCardSkeleton key={index}/>
                ))
            }


        </ul>
    );
};

export default PageHoopSessionsList;
