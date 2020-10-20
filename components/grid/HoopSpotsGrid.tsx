import React, {FunctionComponent, useEffect, useState} from 'react';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import HoopSpotImageCard from '../card/HoopSpotImageCard';
import HoopSpotColSkeleton from '../skeleton/HoopSpotColSkeleton';
import Link from 'next/link';


const HoopSpotsGrid: FunctionComponent = () => {
    const [hoopSpots, setHoopSpots] = useState<HoopSpot[]>([]);
    const restService: RestService = new RestService();

    useEffect(() => {
        if (hoopSpots.length === 0) {
            restService.makeHttpRequest(`hoopspots`, `GET`).then((res: ResponseFactory<HoopSpot[]>) => {
                console.log(res);
                setHoopSpots(res.data);
            });
        }
    }, []);

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
                )): [...Array(6)].map((_i, index) => (
                    <HoopSpotColSkeleton key={index}/>
                ))
            }
        </div>
    )
};

export default HoopSpotsGrid;
