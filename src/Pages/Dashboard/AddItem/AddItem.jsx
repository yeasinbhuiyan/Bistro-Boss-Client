import React from 'react';
import SectionTitle from '../../../Componentes/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';



const img_hosting_token = import.meta.env.VITE_Image_upload_token




const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, watch, reset} = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`

    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url
                    console.log(imgURL)

                    const { name, price, category, recipe } = data
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }

                    axiosSecure.post('/menu',newItem)
                    .then(data => {
                        if(data.data.insertedId){
                            reset()
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Menu Item Added Successfully',
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                    })

                }
                console.log(imgResponse)
            })

    };


    return (
        <div className='w-full px-10'>

            <SectionTitle subHeading={'Whats New'} heading={'Add an item'}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input {...register("name", { required: true, maxLength: 120 })} type="text" placeholder="Recipe Name" className="input input-bordered w-full" />

                </div>


                <div className='flex gap-5 my-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Desi</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>

                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />

                    </div>
                </div>

                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text">Recipe Details*</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className=" textarea input-bordered w-full" placeholder="Bio"></textarea>
                </div>


                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text">Item Image</span>

                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full" />

                </div>

                <div>
                    <input type="submit" className='btn btn-sm mt-4' value="Add Item" />
                </div>


            </form>
        </div>
    );
};

export default AddItem;