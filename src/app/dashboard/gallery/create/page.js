"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function GalleryAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    // 🔧 Build FormData
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("youtubeLink", data.youtubeLink);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]); // field name must match backend
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery`,
      {
        method: "POST",
        credentials: "include",
        body: formData, // ✅ send FormData
      }
    );

    const result = await response.json();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? "/gallery" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Gallery</h2>

      <div>
        <label>Title:</label>
        <input type="text" {...register("title", { required: true })} />
      </div>

      <div>
        <label>YouTube Link:</label>
        <input type="url" {...register("youtubeLink")} />
      </div>

      <div>
        <label>Images (upload multiple):</label>
        <input type="file" {...register("images")} multiple />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
