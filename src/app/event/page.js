'use client';

import { useEffect, useState } from 'react';
import Edit from "@/components/Edit";

const Event = () => {
  const [eventsData, setEventsData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event?page=${page}&limit=${limit}`
        );
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEventsData(data.events);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventsData([]);
        setTotal(0);
      }
    };

    fetchEvents();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Event List</h2>
      {eventsData.length === 0 ? (
        <p>No event data found.</p>
      ) : (
        <>
          {eventsData.map((event) => (
            <div key={event._id}>
              <Edit model={"event"} id={event._id} />
              <hr style={{margin: "25px 0"}}/>
              <h3>
                {event.title} ({event.titleBangla})
              </h3>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Event Date:</strong> {event.eventDate}
              </p>
              <p>
                <strong>Registration:</strong> {event.registrationStartDate} to{" "}
                {event.registrationEndDate}
              </p>
              <p>
                <strong>Posted By:</strong> {event.postedBy?.name} (
                {event.postedBy?.email})
              </p>
              <p>
                <strong>Created At:</strong> {event.createDate?.date}{" "}
                {event.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated At:</strong> {event.updateDate?.date}{" "}
                {event.updateDate?.formatedTime}
              </p>
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

export default Event;
