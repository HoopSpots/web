import React, {FunctionComponent, useEffect, useState} from 'react';
import {SectionHeading} from '../typography/SectionHeading';
import {SliderButton} from '../button/SliderButton';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {HoopSpotCard} from '../card/HoopSpotCard';
import {HoopSpotCardSkeleton} from '../skeleton/HoopSpotCardSkeleton';
import {getPosition} from '../../services/Geolocation';

const HoopSpotSlider: FunctionComponent = () => {
    const restService: RestService = new RestService();
    const [hoopSpots, setHoopSpots] = useState<HoopSpot[]>([]);
    const [sliderSettings] = useState({
        arrows: false,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    const getHoopSpots = (coords?: Coordinates) => {
        const params = coords ? {lat: coords.latitude, long: coords.longitude}: undefined;
        restService.makeHttpRequest(`hoopspots`, `GET`, null, params).then((res: ResponseFactory<HoopSpot[]>) => {
            setHoopSpots(res.data)
        }).catch(() => {

        });
    };

    const [sliderRef, setSliderRef] = useState<Slider|null>(null);
    useEffect(() => {
        if (hoopSpots.length === 0) {
            getPosition()
                .then((position) => {
                    // show hoop spots with geolocation enabled.
                    getHoopSpots(position.coords);
                }, () => {
                    getHoopSpots();
                })
                .catch(() => {
                    // get hoop spots without geolocation if rejected.
                    getHoopSpots();
                });
        }
    });

    const nextSlide = () => {
        sliderRef?.slickNext();
    };

    const previousSlide = () =>  {
        sliderRef?.slickPrev();
    };

    return (
        <section className="md:py-8 md:my-0">
            <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                <div className="flex flex-col items-center sm:items-stretch sm:flex-row justify-between">
                    <SectionHeading>Hoop Spots Near You</SectionHeading>
                    <div className="flex items-center">
                        <SliderButton onClick={() => previousSlide()}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 19l-7-7 7-7"/>
                            </svg>
                        </SliderButton>

                        <SliderButton onClick={() => nextSlide()}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 5l7 7-7 7"/>
                            </svg>
                        </SliderButton>
                    </div>
                </div>
                <Slider className="mt-10 px-2" ref={c => setSliderRef(c)} {...sliderSettings}>
                    {hoopSpots.length > 0 ? hoopSpots.map((hoopSpot: HoopSpot) => (
                        <HoopSpotCard key={hoopSpot.id} hoopSpot={hoopSpot}/>
                    )) : [...Array(3)].map((i, index) => (
                        <HoopSpotCardSkeleton key={index * i + '' + i}/>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default HoopSpotSlider;
