import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const onSubmit = data => {

        console.log(data)
        createUser(data.email, data.password)

            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                reset()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')

            })
            .catch((error) => {
                console.log(error.message)
            })

    };

    return (

        <>
            <Helmet>

                <title>Bistro Boss | Sign Up</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })}
                                    placeholder="Photo URL" className="input input-bordered" />

                                {errors.photoURL && <span className="text-sm text-red-700">Photo Url is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })}
                                    name='name' placeholder="Name" className="input input-bordered" />

                                {errors.name && <span className="text-sm text-red-700">Name is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-sm text-red-700">Email is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    name='password' placeholder="password" className="input input-bordered" />
                                {/* {errors.password && <span className="text-sm text-red-700">Password is required</span>} */}
                                {errors.password?.type === 'minLength' && <span className="text-sm text-red-700">Password Must Be 6 Characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-sm text-red-700">Password Must Be Less Then 20 Characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-sm text-red-700">Password must have one uppercase one lower case, one number and one special character </span>}


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p>Already haven an Account Go To<Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;