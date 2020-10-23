import React, {FunctionComponent, useEffect, useState} from 'react';
import Slider from 'react-slick';
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {SectionHeading} from '../typography/SectionHeading';
import {SliderButton} from '../button/SliderButton';
import {HoopSessionCard} from '../card/HoopSessionCard';
import {HoopSessionCardSkeleton} from '../skeleton/HoopSessionCardSkeleton';

const HoopSessionSlider: FunctionComponent = () => {
    const restService: RestService = new RestService();
    const [hoopSessions, setHoopSessions] = useState<HoopSession[]>([]);
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
    const getPosition = (options?: PositionOptions): Promise<Position>  =>{
        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    };

    const getHoopSessions = (coords?: Coordinates) => {
        const params = coords ? {lat: coords.latitude, long: coords.longitude}: undefined;
        restService.makeHttpRequest(`hoopsessions`, `GET`, null, params).then((res: ResponseFactory<HoopSession[]>) => {
            setHoopSessions(res.data)
        }).catch(err => {
            console.log('here is my error ' + err);
        });
    };

    const [sliderRef, setSliderRef] = useState<Slider|null>(null);
    useEffect(() => {
        if (hoopSessions.length === 0) {
            getPosition()
                .then((position) => {
                    // show hoop sessions with geolocation enabled.
                    getHoopSessions(position.coords);
                }, err => {
                    console.log(err);
                    getHoopSessions();
                })
                .catch((err) => {
                    // get hoop sessions without geolocation if rejected.
                    getHoopSessions();
                    console.log(err);
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
        <section className="md:py-8 md:my-0 bg-accent">
            <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                <div className="flex flex-col items-center sm:items-stretch sm:flex-row justify-between">
                    <SectionHeading>Pickup Games Near You</SectionHeading>
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
                    {hoopSessions.length > 0 ? hoopSessions.map((hoopSession: HoopSession) => (
                        <HoopSessionCard key={hoopSession.uuid} hoopSession={hoopSession}/>
                    )) : [...Array(3)].map((i, index) => (
                        <HoopSessionCardSkeleton key={index * i + '' + index}/>
                    ))}
                </Slider>
            </div>
        </section>
    )
};

export default HoopSessionSlider;
