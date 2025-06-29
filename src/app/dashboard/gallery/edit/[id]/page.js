"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function GalleryUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  // Fetch existing gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery/${id}`);
        const data = await res.json();
        if (data?.gallery) {
          setValue("title", data.gallery.title);
          setValue("youtubeLink", data.gallery.youtubeLink);
        }
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      }
    };

    if (id) fetchGallery();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("youtubeLink", data.youtubeLink);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery/${id}`,
      {
        method: "PUT",
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
        path: result.message ? "/gallery" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update Gallery</h2>

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

      <button type="submit">Update</button>
    </form>
  );
}
