"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function EventAdd() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/`,
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
          path: "/event",
        },
      });
    } else {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Failed to add event",
          status: "error",
          path: "",
        },
      });
    }

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Event</h2>

      <div>
        <label>Title:</label>
        <input type="text" {...register("title", { required: true })} />
      </div>

      <div>
        <label>Title (Bangla):</label>
        <input type="text" {...register("titleBangla", { required: true })} />
      </div>

      <div>
        <label>Description:</label>
        <textarea {...register("description", { required: true })}></textarea>
      </div>

      <div>
        <label>Event Date:</label>
        <input type="date" {...register("eventDate", { required: true })} />
      </div>

      <div>
        <label>Registration Start Date:</label>
        <input
          type="date"
          {...register("registrationStartDate", { required: true })}
        />
      </div>

      <div>
        <label>Registration End Date:</label>
        <input
          type="date"
          {...register("registrationEndDate", { required: true })}
        />
      </div>

      <div>
        <label>Location:</label>
        <input type="text" {...register("location", { required: true })} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
