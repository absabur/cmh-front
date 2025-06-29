"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function PostAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("youtubeLink", data.youtubeLink);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`,
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
        path: result.message ? "/post" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Post</h2>

      <div>
        <label>Title:</label>
        <input type="text" {...register("title", { required: true })} />
      </div>

      <div>
        <label>Content:</label>
        <textarea {...register("content", { required: true })}></textarea>
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
