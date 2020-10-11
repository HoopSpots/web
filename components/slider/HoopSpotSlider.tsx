import React, {Component} from 'react';
import {SectionHeading} from '../typography/SectionHeading';
import {SliderButton} from '../button/SliderButton';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {RestService} from '../../services/RestService';
import {ResponseFactory} from '../../interfaces/ResponseFactory';
import {HoopSpotCard} from '../card/HoopSpotCard';
import {HoopSpotCardSkeleton} from '../skeleton/HoopSpotCardSkeleton';

type MyProps = {};
type MyState = {
    hoopSpots: HoopSpot[],
    sliderSettings: {
        arrows: boolean,
        slidesToShow: number,
        responsive: any;
    },
    sliderRef: any,
    setSliderRef: any
};


export class HoopSpotSlider extends Component<MyProps, MyState> {
    state = {
        hoopSpots: [],
        sliderSettings: {
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
        },
        sliderRef: null,
        setSliderRef: null
    };
    private slider: Slider | null = null;

    componentDidMount(): void {

        const restService: RestService = new RestService();
        restService.makeHttpRequest(`hoopspots`, `GET`).then((res: ResponseFactory<HoopSpot[]>) => {
            this.setState({hoopSpots: res.data});
        }).catch(err => {
            console.log('here is my error ' + err);
        });
    }

    nextSlide(): void {
        if (this.slider) {
            this.slider.slickNext()
        }
    }

    previousSlide(): void {
        if (this.slider) {
            this.slider.slickPrev()
        }
    }

    render() {
        return (
            <section className="md:py-8 md:my-0">
                <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                    <div className="flex flex-col items-center sm:items-stretch sm:flex-row justify-between">
                        <SectionHeading>Hoop Spots Near You</SectionHeading>
                        <div className="flex items-center">
                            <SliderButton onClick={() => this.previousSlide()}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                            </SliderButton>

                            <SliderButton onClick={() => this.nextSlide()}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </SliderButton>
                        </div>
                    </div>
                    <Slider className="mt-10 px-2" ref={c => (this.slider = c)} {...this.state.sliderSettings}>
                        {this.state.hoopSpots.length > 0 ? this.state.hoopSpots.map((hoopSpot: HoopSpot) => (
                            <HoopSpotCard key={hoopSpot.id} hoopSpot={hoopSpot}/>
                        )) : [...Array(3)].map((i, index) => (
                            <HoopSpotCardSkeleton key={index * i + '' + i}/>
                        ))}
                    </Slider>
                </div>
            </section>
        );
    }
}
