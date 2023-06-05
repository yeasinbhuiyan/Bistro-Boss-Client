import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { json, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import useCart from '../../../hooks/useCart';

const OrderTabCard = ({ item }) => {
    const { image, price, recipe, name , _id } = item
    const { user } = useContext(AuthContext)
    const [,refetch] = useCart()

    const navigate = useNavigate()
    const location = useLocation()

    const handleAddToCart = (item) => {
        console.log(item)
        if (user && user?.email) {
            const orederItem = {MenuItemId : _id , name , image , email : user.email , price}
            fetch('https://bistro-boss-server-livid.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(orederItem)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.insertedId){
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Food added your cart',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })

        }
        else {
            Swal.fire({
                title: 'Please Login To Order The Food',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes Login Now'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login',{state :{from : location}})

                }
              })
        }

    }
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='bg-black absolute text-white top-2 mr-2 rounded px-2 right-0'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p className='text-center'>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-orange-400 text-orange-400 border-b-4 mt-4 rounded">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default OrderTabCard;