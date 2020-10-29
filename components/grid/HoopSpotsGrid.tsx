import React, {FunctionComponent, useEffect, useState} from 'react';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import HoopSpotImageCard from '../card/HoopSpotImageCard';
import HoopSpotColSkeleton from '../skeleton/HoopSpotColSkeleton';
import Link from 'next/link';
import {getPosition} from '../../services/Geolocation';


const HoopSpotsGrid: FunctionComponent = () => {
    const [hoopSpots, setHoopSpots] = useState<HoopSpot[]>([]);
    const [loadedHoopSpots, setLoadedHoopSpots] = useState<boolean>(false);
    const restService: RestService = new RestService();

    useEffect(() => {
        if (!loadedHoopSpots) {
            getPosition()
                .then((position) => {
                    // show hoop sessions with geolocation enabled.
                    getHoopSpots(position.coords);
                }, () => {
                    getHoopSpots();
                })
                .catch(() => {
                    // get hoop spots without geolocation if rejected.
                    getHoopSpots();
                });
        }
    }, []);

    const getHoopSpots = (coords?: Coordinates) => {
        const params = coords ? {lat: coords.latitude, long: coords.longitude}: undefined;
        restService.makeHttpRequest(`hoopspots`, `GET`, null, params).then((res: ResponseFactory<HoopSpot[]>) => {
            setHoopSpots(res.data)
        });
        setLoadedHoopSpots(true);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {
                hoopSpots.length > 0 || hoopSpots.length === undefined ? hoopSpots.map(hoopSpot => (
                    <div className="col-span-1" key={hoopSpot.uuid}>
                        <Link href={`/hoopspot/${hoopSpot.slug}`}>
                            <a>
                                <HoopSpotImageCard hoopSpot={hoopSpot}/>
                            </a>
                        </Link>
                    </div>
                )): [...Array(12)].map((_i, index) => (
                    <HoopSpotColSkeleton key={index}/>
                ))
            }
        </div>
    )
};

export default HoopSpotsGrid;
