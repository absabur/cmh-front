"use client"
import { registerAdmin } from "@/store/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function FullSignUpForm() {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(registerAdmin(data))
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
      </div>

      <div>
        <label>Phone:</label>
        <input type="tel" {...register("phone", { required: true })} />
      </div>

      <div>
        <label>National ID:</label>
        <input type="text" {...register("nId", { required: true })} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password", { required: true })} />
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
      </div>

      <div>
        <label>Verification Code:</label>
        <input type="text" {...register("verificationCode", { required: true })} />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
