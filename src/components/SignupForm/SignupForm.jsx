// src/components/SignupForm/SignupForm.jsx
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';

import { schema } from "./validation";
import { mockUserRegistration } from "./api";
import {
    DivStyle,
    FormStyle,
    FormGroupStyle,
    LabelStyle,
    InputStyle,
    ErrorStyle,
    SubmitBtn
} from "./SignupFormStyles";

export default function SignupForm() {
    // For redirecting on success
    const navigate = useNavigate();
    // Grab login() from AuthProvider                                        
    const { login } = useContext(AuthContext);

    // Initialize RHF with Yup-based validation
    const {
        // Registers inputs
        register,
        // Wraps onSubmit with validation                                                     
        handleSubmit,
        // Contains validation errors                                                         
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            university_email: "",
            password: ""
        }
    });

    /**
     * onSubmit
     * 1. Calls mockUserRegistration() to “save” the user
     * 2. Calls login() to update auth state & localStorage
     * 3. Navigates to /dashboard exactly once
     */
    const onSubmit = data => {
        const newUser = mockUserRegistration(data.university_email, data.password);
        console.log("registered user →", { username: newUser.username });
        login(newUser);
        navigate("/dashboard");
    };

    return (
        <div style={DivStyle}>
            <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
                {/* --- University Email Field --- */}
                <div style={FormGroupStyle}>
                    {/* htmlFor must match input’s id */}
                    <label htmlFor="university_email" style={LabelStyle}>
                        University Email
                    </label>
                    <input
                        id="university_email"                                          // Links label → this input
                        type="email"                                                   // Mobile‐friendly email keyboard
                        placeholder="2410589@live.stmarys.ac.uk"                      // Example format
                        style={InputStyle}
                        {...register("university_email")}                             // RHF: adds name & ref
                    />
                    {errors.university_email && (
                        <p style={ErrorStyle}>{errors.university_email.message}</p>
                    )}
                </div>

                {/* --- Password Field --- */}
                <div style={FormGroupStyle}>
                    <label htmlFor="password" style={LabelStyle}>
                        Password
                    </label>
                    <input
                        id="password"                                                  // Links label → this input
                        type="password"                                                // Masks user input
                        placeholder="Enter your password"
                        style={InputStyle}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p style={ErrorStyle}>{errors.password.message}</p>
                    )}
                </div>

                {/* --- Submit Button --- */}
                <button style={SubmitBtn} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
