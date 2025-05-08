// src/components/LoginForm/LoginForm.jsx

import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import { checkIfCanLogin } from "./api";

import {
  DivStyleRegular,
  FormStyle,
  FormGroup,
  LabelStyle,
  InputStyleRegular,
  ErrorStyle,
  SubmitBtn
} from "./LoginFormStyles";

/**
 * LoginForm
 *
 * @param {{ onLogin: (user:{username:string})=>void }} props
 *   onLogin is called when credentials pass checkIfCanLogin
 */
export default function LoginForm({ onLogin }) {
  // Initialize react-hook-form with Yup schema
  const {
    register,                                                          // register inputs
    handleSubmit,                                                      // wrap onSubmit for validation
    formState: { errors }                                              // holds validation errors
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      university_email: '',
      password: ''
    }
  });

  /**
   * Called when the form passes validation.
   * If checkIfCanLogin succeeds, invoke the passed-in onLogin callback.
   */
  const onSubmit = (data) => {
    const { university_email, password } = data;
    if (checkIfCanLogin(university_email, password)) {
      // pass the user object back up so LoginPage can login() & navigate
      onLogin({ username: university_email });
    } else {
      // handle a failed login
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div style={DivStyleRegular}>
      <form style={FormStyle} onSubmit={handleSubmit(onSubmit)}>
        {/* University Email Field */}
        <div style={FormGroup}>
          <label htmlFor="university_email" style={LabelStyle}>
            University Email
          </label>
          <input
            id="university_email"
            type="email"
            placeholder="regnum@live.stmarys.ac.uk"
            style={InputStyleRegular}
            {...register("university_email")}
          />
          {errors.university_email && (
            <p style={ErrorStyle}>{errors.university_email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div style={FormGroup}>
          <label htmlFor="password" style={LabelStyle}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            style={InputStyleRegular}
            {...register("password")}
          />
          {errors.password && (
            <p style={ErrorStyle}>{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button style={SubmitBtn} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
