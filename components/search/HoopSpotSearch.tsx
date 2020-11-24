import React, {FunctionComponent, useState} from 'react';
import {RestService} from '../../services/RestService';
import qs from 'qs';
import {HoopSpotTypeEnum} from '../../interfaces/enums/HoopSpotTypeEnum';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {getPosition} from '../../services/Geolocation';

type HoopSpotSearchProps = {
    filterHoopSpots(bar: Promise<ResponseFactory<HoopSpot[]>>): void;
};

const HoopSpotSearch: FunctionComponent<HoopSpotSearchProps> = (props) => {
    const [name, setName] = useState<string>('');
    const [distance, setDistance] = useState<number>(100);
    const [hasCovidRestriction, setHasCovidRestriction] = useState<boolean>(false);
    const [hoopSpotType, setHoopSpotType] = useState<keyof typeof HoopSpotTypeEnum | undefined>(undefined);
    const restService = new RestService();

    const handleFormSubmission = (event: any) => {
        event.preventDefault();

        getPosition().then((position) => {
            // show hoop sessions with geolocation enabled.
            getFilteredHoopSpots(position.coords);
        }, () => {
            getFilteredHoopSpots();
        })
            .catch(() => {
                // get hoop spots without geolocation if rejected.
                getFilteredHoopSpots();
            });

    };

    const getFilteredHoopSpots = (coords?: Coordinates) => {
        let filter = {
            filter: {
                name: name ? name : undefined,
                has_covid_restriction: hasCovidRestriction ? undefined : false,
                hoop_spot_type: hoopSpotType ?? undefined
            }
        };


        // @ts-ignore
        let filtr = qs.stringify(filter);
        console.log(filtr)

        const params = {
            filtr,
            max_distance: distance,
            lat: coords?.latitude,
            long: coords?.longitude
        };

        console.log(params);

        const request: Promise<ResponseFactory<HoopSpot[]>> = restService.makeHttpRequest(`hoopspots`, `GET`, null, params);
        props.filterHoopSpots(request);
    }
        ;

        return (
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-md shadow-md w-full px-2 py-4 lg:py-0 mb-4">
                    <form className="grid grid-cols-2 lg:grid-cols-6 gap-5" onSubmit={handleFormSubmission}>
                        <div className="col-span-2 lg:my-4 space-y-1">
                            <label htmlFor=""
                                   className="text-sm font-medium tracking-tighter text-gray-700">Name</label>
                            <input id="name"
                                   value={name}
                                   onChange={event => setName(event.target.value)}
                                   className="form-input w-full block bg-gray-50 rounded-md px-3 py-2 shadow focus:outline-none h-12 text-sm font-medium"
                                   placeholder="Search for Hoop Spots 🔍"/>
                        </div>
                        <div className="col-span-1 lg:my-4 space-y-1">
                            <label className="text-sm font-medium tracking-tighter text-gray-700">Gym Type</label>
                            <select id="gym_type"
                                    onChange={event => setHoopSpotType(event.target.value as keyof typeof HoopSpotTypeEnum)}
                                    className="form-select w-full block bg-gray-50 rounded-md px-3 py-3 shadow focus:outline-none h-12 text-sm font-medium text-gray-500">
                                <option value="" selected disabled>Hoop Spot Type(s)</option>
                                <option value={HoopSpotTypeEnum.lifetime_fitness}>Lifetime Fitness's</option>
                                <option value={HoopSpotTypeEnum.la_fitness}>LA Fitness's</option>
                                <option value={HoopSpotTypeEnum.athletic_club}>Athletic Clubs</option>
                                <option value={HoopSpotTypeEnum.ymca}>YMCA's</option>
                            </select>
                        </div>
                        <div className="col-span-1 lg:my-4 space-y-1">
                            <label className="text-sm font-medium tracking-tighter text-gray-700">Distance (mi)</label>
                            <input id="distance"
                                   value={distance}
                                   onChange={event => setDistance(event.target.valueAsNumber)}
                                   type="number"
                                   className="form-input w-full block bg-gray-50 rounded-md my-4 px-3 py-2 shadow focus:outline-none h-12 text-sm font-medium"
                                   placeholder="Max Distance (miles)"/>
                        </div>
                        <div className="col-span-1 lg:my-4 space-y-1">
                            <label className="text-sm font-medium tracking-tighter text-gray-700">Include Closed
                                Gyms</label>
                            <select
                                id="show_closed_gyms"
                                onChange={event => setHasCovidRestriction(event.target.value as unknown as boolean)}
                                className="form-select w-full block bg-gray-50 rounded-md px-3 py-3 shadow focus:outline-none h-12 text-sm font-medium text-gray-500">
                                <option value={1}>Yes</option>
                                <option value={0} selected>No</option>
                            </select>
                        </div>
                        <div className="col-span-1 lg:col-span-1 lg:my-4 space-y-1">
                            <label className="text-sm font-medium tracking-tighter text-gray-700">&nbsp;</label>
                            <button type="submit"
                                    className="bg-gray-900 px-2 py-2 rounded-md shadow w-full text-white h-12 hover:bg-gray-800 focus:outline-none">Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default HoopSpotSearch;
