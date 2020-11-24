import React, {FunctionComponent, useEffect, useState} from 'react';
import {RestService} from '../../services/RestService';
import {getPosition} from '../../services/Geolocation';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import HoopSpotSearch from '../search/HoopSpotSearch';
import Link from 'next/link';
import HoopSpotImageCard from '../card/HoopSpotImageCard';
import HoopSpotColSkeleton from '../skeleton/HoopSpotColSkeleton';

const HoopSpotsPage: FunctionComponent = () => {
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
    }, hoopSpots);

    const getHoopSpots = (coords?: Coordinates) => {
        const params = coords ? {lat: coords.latitude, long: coords.longitude}: undefined;
        restService.makeHttpRequest(`hoopspots`, `GET`, null, params).then((res: ResponseFactory<HoopSpot[]>) => {
            setHoopSpots(res.data)
            setLoadedHoopSpots(true);
        });
    };

    const filterHoopSpots = (request: Promise<ResponseFactory<HoopSpot[]>>) => {
        setHoopSpots([]);
        request.then((res) => {
            setHoopSpots(res.data);
        })
    };

    return (
        <section className="bg-accent h-full py-8 lg:py-16">
            <div className="container mx-auto">
                <div className="md:max-w-7xl mx-auto px-4">
                    <HoopSpotSearch filterHoopSpots={filterHoopSpots}/>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
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
                </div>
            </div>
        </section>
    );
};

export default HoopSpotsPage;
