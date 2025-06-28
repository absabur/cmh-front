"use client"
import { otpSend } from "@/store/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(otpSend(data.email))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email", { required: true })} />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
