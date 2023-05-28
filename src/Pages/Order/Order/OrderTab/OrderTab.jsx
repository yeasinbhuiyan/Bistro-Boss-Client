import React from 'react';
import OrderTabCard from '../../../Shared/OrderTabCard/OrderTabCard';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";



// ToDo pagination work
const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='grid md:grid-cols-3 gap-6 my-10'>
                    {
                        items.map(item => <OrderTabCard item={item}></OrderTabCard>)
                    }
                </div>
            </SwiperSlide>

        </Swiper>

    );
};

export default OrderTab;