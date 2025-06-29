"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function TeacherAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("title", data.title);
    formData.append("about", data.about);
    formData.append("address", data.address);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.json();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? "/teacher" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Teacher</h2>

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
        <label>Title:</label>
        <input type="text" {...register("title", { required: true })} />
      </div>

      <div>
        <label>About:</label>
        <textarea {...register("about", { required: true })}></textarea>
      </div>

      <div>
        <label>Address:</label>
        <input type="text" {...register("address", { required: true })} />
      </div>

      <div>
        <label>Profile Image:</label>
        <input type="file" {...register("image")} accept="image/*" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
