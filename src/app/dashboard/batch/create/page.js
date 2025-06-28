"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function BatchAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({
      type: LOADING_START,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    
    if (result.message) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.message,
          status: "success",
          path: "/dashboard/batch",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to add batch",
          status: "error",
          path: "",
        },
      });
    }

    dispatch({
      type: LOADING_END,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Batch</h2>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
