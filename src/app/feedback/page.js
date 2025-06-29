"use client";

import { LOADING_END, LOADING_START, MESSAGE } from "@/store/constant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FeedbackPage = () => {
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch`
        );
        const data = await res.json();
        setBatches(data.batches || []);
      } catch (err) {
        console.error("Failed to fetch batches");
      }
    };

    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      batch: form.batch,
      message: form.message,
    };

    try {
      dispatch({ type: LOADING_START });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (result.message) {
        dispatch({
          type: MESSAGE,
          payload: {
            message: result.message,
            status: "success",
            path: `/`,
          },
        });
      }
      console.log(result);
    } catch (err) {
      dispatch({
        type: MESSAGE,
        payload: {
          message: result.error || "Somthing Wrong",
          status: "error",
          path: ``,
        },
      });
    }
    dispatch({ type: LOADING_END });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Submit Feedback</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <select
          name="batch"
          value={form.batch}
          onChange={handleChange}
          required
        >
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.name}
            </option>
          ))}
        </select>
        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackPage;
