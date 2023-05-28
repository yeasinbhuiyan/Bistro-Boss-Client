import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart , refetch] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const hadnleDelete = (item) => {


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })

    }
    return (
        <>
            {/* TODO  */}
            {/* div className='w-full' */}


            <Helmet>

                <title>Bistro Boss | My Cart</title>

            </Helmet>
         
         <div className='uppercase font-semibold flex justify-evenly items-center w-full h-[60px]'>
                <h3 className='text-3xl'>total items : {cart.length}</h3>
                <h3 className='text-3xl'>total Price : {total}</h3>
                <button className='btn btn-warning btn-sm'> pay </button>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => <tr key={item._id}>

                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <button onClick={() => hadnleDelete(item)} className="btn btn-ghost btn-xs text-white hover:text-black bg-red-600"><FaTrashAlt ></FaTrashAlt></button>
                                </td>


                            </tr>)
                        }


                    </tbody>



                </table>
            </div>
         


        </>

    );
};

export default MyCart;