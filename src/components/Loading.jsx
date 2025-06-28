"use client";
import { useSelector } from "react-redux";

import "./loading.css";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader">
            <div className="spinner" />
            <p>Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
