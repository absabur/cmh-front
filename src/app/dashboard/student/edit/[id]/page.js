"use client";
import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function MemberUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [batches, setBatches] = useState([]);

  // Fetch batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch`);
        const data = await res.json();
        setBatches(data.batches);
      } catch (err) {
        console.error("Failed to fetch batches", err);
      }
    };
    fetchBatches();
  }, []);

  // Fetch existing member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/${id}`);
        const data = await res.json();
        if (data?.student) {
          const fields = [
            "name",
            "email",
            "phone",
            "batch",
            "about",
            "profession",
            "address",
            "type",
          ];
          fields.forEach((field) => setValue(field, data.student[field]?._id || data.student[field]));
        }
      } catch (err) {
        console.error("Failed to fetch student", err);
      }
    };
    if (id) fetchMember();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    dispatch({ type: LOADING_START });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("batch", data.batch);
    formData.append("about", data.about);
    formData.append("profession", data.profession);
    formData.append("address", data.address);
    formData.append("type", data.type);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/${id}`,
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
        path: result.message ? "/student" : "",
      },
    });

    dispatch({ type: LOADING_END });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update Member</h2>

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
        <label>Batch:</label>
        <select {...register("batch", { required: true })}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>About:</label>
        <textarea {...register("about", { required: true })}></textarea>
      </div>

      <div>
        <label>Profession:</label>
        <input type="text" {...register("profession", { required: true })} />
      </div>

      <div>
        <label>Address:</label>
        <input type="text" {...register("address", { required: true })} />
      </div>

      <div>
        <label>Type:</label>
        <select {...register("type", { required: true })}>
          <option value="">Select</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>
      </div>

      <div>
        <label>Profile Image:</label>
        <input type="file" {...register("image")} accept="image/*" />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}
