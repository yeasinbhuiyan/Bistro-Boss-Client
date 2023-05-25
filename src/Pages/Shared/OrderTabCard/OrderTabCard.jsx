import React from 'react';

const OrderTabCard = ({item}) => {
    const { image, price, recipe, name } = item
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p  className='bg-black absolute text-white top-2 mr-2 rounded px-2 right-0'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p className='text-center'>{recipe}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-outline border-0 border-orange-400 text-orange-400 border-b-4 mt-4 rounded">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default OrderTabCard;