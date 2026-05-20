import React, {useContext, useState} from 'react';
import type {LoginDto} from "../model/LoginDto.ts";
import {Link, useNavigate} from "react-router-dom";
import {login, setLoggedInUserName, setRoleName, setToken} from "../service/AuthService.ts";
import {CartContext} from "../context/CartContext.ts";

// Define the functional component using a standard arrow function syntax.
// We are explicitly typing the component using React.FC (Functional Component) 
// for better TypeScript correctness, although it's optional.
export default function LoginComponent(){
    const {cartItems} = useContext(CartContext);
    // Optional: Add state management for inputs if this were a real form
    const [loginDto,setLoginDto] =useState<LoginDto>({
        username:"",
        password:""
    });
    const navigator = useNavigate();

    // Define a handler for form submission, explicitly typed for the event object
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(loginDto)
            .then(res => {
               // console.log(res.data);
                const {username,roleName} = res.data;
                const token = 'Basic '+btoa(loginDto.username+':'+loginDto.password);
                setToken(token);
                setLoggedInUserName(username);
                setRoleName(roleName);
                setLoginDto({...loginDto,username:"",password:""})
                if('ROLE_TEACHER' === roleName){
                    navigator('/admin-dashboard');
                }else if('ROLE_STUDENT' === roleName  && cartItems.length > 0){
                    navigator('/enrolled-success');
                }
                else if('ROLE_STUDENT' === roleName  && cartItems.length === 0){
                    navigator('/own-property');
                }
                else {
                    navigator('/');
                }
               // window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        // The outer div remains the same, setting up the centered background
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

            {/* The main card container */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 transform transition-all duration-500 hover:shadow-xl">

                {/* Header Section */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                    Welcome Back!
                </h2>
                <p className="text-center text-sm text-gray-600">
                    Sign in to continue to your account.
                </p>

                {/* Login Form: using onSubmit for the form handler */}
                <form className="flex flex-col gap-4">

                    {/* Username/Email Input Field */}
                    <div>
                        {/* 'htmlFor' must be used instead of 'for' in JSX */}
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 sr-only">
                            Username/Email
                        </label>
                        <input type="text"
                               id="username"
                            // 'className' must be used instead of 'class'
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-500"
                               placeholder="Enter Username or Email"
                               value={loginDto.username}
                            // Explicitly type the change event for TypeScript
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginDto({...loginDto,username:e.target.value})}
                        />
                    </div>

                    {/* Password Input Field */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">
                            Password
                        </label>
                        <input type="password"
                               id="password"
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-500"
                               placeholder="Password"
                               value={loginDto.password}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginDto({...loginDto,password:e.target.value})}
                        />
                    </div>

                    {/* Primary Login Button */}
                    <button type="button"
                            onClick={handleSubmit}
                            className="w-full flex justify-center
                            py-2 px-4 border border-transparent
                            rounded-lg shadow-sm text-lg font-medium
                            text-white bg-indigo-600
                            hover:bg-indigo-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2
                            focus:ring-indigo-500 transition
                            duration-200 ease-in-out transform
                            hover:scale-[1.01]">
                        Log In
                    </button>
                </form>

                {/* Separator Section */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            or
                        </span>
                    </div>
                </div>

                {/* Secondary Register Button */}
                <Link to="/register" type="button"
                        className="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out">
                    Don't have an account? Register
                </Link>

            </div>
        </div>
    );
};

