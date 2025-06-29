"use client";

import { useEffect, useState } from "react";
import Edit from "@/components/Edit";
import Link from "next/link";

const Teacher = () => {
  const [teachersData, setTeachersData] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchTeachers = async () => {
      const query = new URLSearchParams({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher?${query}`
      );
      const data = await res.json();

      setTeachersData(data.teachers || []);
      setTotal(data.total || 0);
    };

    fetchTeachers();
  }, [page, search, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div>
      <h2>Teacher List</h2>

      {/* 🔍 Filter UI */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="name/email/phone/title"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
          <option value="title">Title</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button onClick={handleResetFilters}>Reset</button>
      </div>

      {/* 🧑‍🎓 Teachers List */}
      {teachersData.length === 0 ? (
        <p>No teacher data found.</p>
      ) : (
        <>
          {teachersData.map((member) => (
            <div key={member._id}>
              <Edit model={"teacher"} id={member._id} />
              <Link href={`/teacher/${member._id}`}>{member.name}</Link>
              {member.avatar && (
                <img
                  src={`${member.avatar.url}`}
                  alt="Teacher Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              )}
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Title:</strong> {member.title}
              </p>
              <p>
                <strong>About:</strong> {member.about}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Created:</strong> {member.createDate?.date} at{" "}
                {member.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {member.updateDate?.date} at{" "}
                {member.updateDate?.formatedTime}
              </p>
              <hr />
            </div>
          ))}

          {/* ⏮ Pagination */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Teacher;
