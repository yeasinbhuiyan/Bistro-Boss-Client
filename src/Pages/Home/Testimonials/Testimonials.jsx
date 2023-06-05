import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Componentes/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";

import { Rating } from '@smastrom/react-rating'
import { FaBeer, FaWeixin } from 'react-icons/fa';

import '@smastrom/react-rating/style.css'


import "swiper/css";
import "swiper/css/navigation";


import { Navigation } from "swiper";


const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('https://bistro-boss-server-livid.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])
    console.log(reviews)
    return (
        <section className='my-20'>
            <SectionTitle
                subHeading="What Our Client Say"
                heading={'Testimonials'}>

            </SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>  <SwiperSlide

                        key={review._id}

                    >

                        <div className='flex flex-col items-center my-16 mx-24'>
                            
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={review.rating}

                        />
                        <FaWeixin className='text-7xl mt-5'></FaWeixin>
                            <p className='py-5 text-center'>{review.details}</p>

                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                        </div>

                    </SwiperSlide>)
                }


            </Swiper>

        </section>
    );
};

export default Testimonials;