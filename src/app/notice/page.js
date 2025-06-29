"use client";

import { useEffect, useState } from "react";
import Edit from "@/components/Edit";
import Link from "next/link";

const Notice = () => {
  const [noticesData, setNoticesData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notice?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setNoticesData(data.notices);
      setTotal(data.total);
    };

    fetchNotices();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Notice List</h2>
      {noticesData.length === 0 ? (
        <p>No notice data found.</p>
      ) : (
        <>
          {noticesData.map((notice) => (
            <div key={notice._id}>
              <Edit model={"notice"} id={notice._id} />
              <Link href={`/notice/${notice._id}`}>title: {notice.title}</Link>
              <p>
                <strong>Description:</strong> {notice.description}
              </p>
              <p>
                <strong>Type:</strong> {notice.type}
              </p>
              <p>
                <strong>Date & Time:</strong> {notice.dateTime}
              </p>
              <p>
                <strong>Posted By:</strong> {notice.postedBy?.name} (
                {notice.postedBy?.email})
              </p>
              <p>
                <strong>Created:</strong> {notice.createDate?.date} at{" "}
                {notice.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {notice.updateDate?.date} at{" "}
                {notice.updateDate?.formatedTime}
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {notice.images.map((image) => (
                  <img
                    key={image.url}
                    src={image.url}
                    alt="Notice"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                      objectFit: "contain",
                    }}
                  />
                ))}
              </p>
              <hr />
            </div>
          ))}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notice;
