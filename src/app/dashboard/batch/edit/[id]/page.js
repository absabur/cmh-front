"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function BatchUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [preData, setPreData] = useState(null);

  useEffect(() => {
    const fetchBatch = async () => {
      if (id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch/${id}`
          );
          const data = await res.json();
          if (data?.batch) {
            setPreData(data.batch);
            setValue("name", data.batch.name); // ✅ set default value
          }
        } catch (err) {
          console.error("Failed to fetch batch", err);
        }
      }
    };
    fetchBatch();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch/${id}`, // ✅ PATCH or PUT depending on your API
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    dispatch({
      type: MESSAGE,
      payload: {
        message: result.message || result.error || "Unknown error",
        status: result.message ? "success" : "error",
        path: result.message ? `/batch` : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update Batch</h2>

      <div>
        <label>Name:</label>
        <input type="text" {...register("name", { required: true })} />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}
