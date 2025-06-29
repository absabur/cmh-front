"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function NoticeAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("dateTime", data.dateTime);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notice`, // update endpoint if needed
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
        path: result.message ? "/notice" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Notice</h2>

      <div>
        <label>Title:</label>
        <input type="text" {...register("title", { required: true })} />
      </div>

      <div>
        <label>Description:</label>
        <textarea {...register("description", { required: true })}></textarea>
      </div>

      <div>
        <label>Type:</label>
        <select {...register("type", { required: true })}>
          <option value="">Select Type</option>
          <option value="general">General</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div>
        <label>Date & Time:</label>
        <input
          type="datetime-local"
          {...register("dateTime", { required: true })}
        />
      </div>

      <div>
        <label>Images (upload multiple):</label>
        <input type="file" {...register("images")} multiple />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
