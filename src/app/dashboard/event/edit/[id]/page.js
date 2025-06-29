"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function EventUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/${id}`
          );
          const data = await res.json();
          if (data?.event) {
            const fields = [
              "title",
              "titleBangla",
              "description",
              "eventDate",
              "registrationStartDate",
              "registrationEndDate",
              "location",
            ];
            fields.forEach((field) => setValue(field, data.event[field]));
          }
        } catch (err) {
          console.error("Failed to fetch event", err);
        }
      }
    };
    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/${id}`,
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
        message: result.message || result.error || "Failed to update event",
        status: result.message ? "success" : "error",
        path: result.message ? "/event" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update Event</h2>

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

      <button type="submit">Update</button>
    </form>
  );
}
