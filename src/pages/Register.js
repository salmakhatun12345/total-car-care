import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Register = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate()

    const onSubmit = data => {
        createUserWithEmailAndPassword(data.email, data.password)
        reset()
        console.log(data)
    };
    return (
        <div class="bg--base-100 w-full h-screen justify-center items-center flex mt-5">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <h2 className='text-3xl text-center font-bold text-primary'>Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is required'
                                }
                            })} type="text" placeholder="Enter Your Name" class="input input-bordered"
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input   {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid email'
                                }
                            })} type="text" placeholder="Enter Your Email" class="input input-bordered" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input   {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })} type="password" placeholder="Enter Your Password" class="input input-bordered" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.password.message}</span>}
                                {errors.password?.type === 'minLenth' && <span className="label-text-alt text-red-500 ">{errors.password.message}</span>}
                            </label>

                            <label class="label">
                                <small> Already have an account ?  <a href="/login" class="label-text-alt link link-hover text-primary">Please Login</a></small>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Register</button>
                        </div>
                        <div class="divider">OR</div>
                        <button onClick={() => signInWithGoogle()} class="btn btn-outline btn-primary w-full">Continue with google</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;