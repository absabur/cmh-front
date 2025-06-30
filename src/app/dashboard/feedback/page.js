"use client";
import { LOADING_END, LOADING_START } from "@/store/constant";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Feedback = () => {
  const [feedbacksData, setFeedbacksData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbacks(dispatch);
        setFeedbacksData(data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedback List</h2>
      {feedbacksData.length === 0 ? (
        <p>No feedback data found.</p>
      ) : (
        <>
          {feedbacksData.map((feedback) => (
            <div key={feedback._id}>
              <hr style={{margin: "25px 0"}}/>
              <h3>
                {feedback.name} ({feedback.email})
              </h3>
              <p>
                <strong>Phone:</strong> {feedback.phone}
              </p>
              <p>
                <strong>Message:</strong> {feedback.message}
              </p>
              <p>
                <strong>Batch:</strong> {feedback.batch?.name}
              </p>
              <p>
                <strong>Date:</strong> {feedback.createDate?.date} at{" "}
                {feedback.createDate?.formatedTime}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feedback;

// fetcher function
const feedbacks = async (dispatch) => {
  dispatch({ type: LOADING_START });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback/`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  dispatch({ type: LOADING_END });
  return data;
};
