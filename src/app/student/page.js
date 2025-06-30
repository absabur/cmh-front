"use client";

import { useEffect, useState } from "react";
import Edit from "@/components/Edit";
import Link from "next/link";

const Student = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [batches, setBatches] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [batch, setBatch] = useState("");
  const [sortBy, setSortBy] = useState("createDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchBatches = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch`
      );
      const data = await res.json();
      setBatches(data.batches || []);
    };

    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const query = new URLSearchParams({
        page,
        limit,
        search,
        type,
        batch,
        sortBy,
        sortOrder,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student?${query}`
      );
      const data = await res.json();

      setStudentsData(data.students || []);
      setTotal(data.total || 0);
    };

    fetchStudents();
  }, [page, search, type, batch, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearch("");
    setType("");
    setBatch("");
    setPage(1);
  };

  return (
    <div>
      <h2>Student List</h2>

      {/* 🔍 Filter UI */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="name/email/phone/profession"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Types</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Alumni">Alumni</option>
        </select>
        <select
          value={batch}
          onChange={(e) => {
            setBatch(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
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

      {/* 🧑‍🎓 Students List */}
      {studentsData.length === 0 ? (
        <p>No student data found.</p>
      ) : (
        <>
          {studentsData.map((member) => (
            <div key={member._id}>
              <Edit model={"student"} id={member._id} />
              <Link href={`/student/${member._id}`}>{member.name}</Link>
              {member.avatar && (
                <img
                  src={`${member.avatar.url}`}
                  alt="Student Avatar"
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
                <strong>Type:</strong> {member.type}
              </p>
              <p>
                <strong>Profession:</strong> {member.profession}
              </p>
              <p>
                <strong>Batch:</strong> {member.batch?.name}
              </p>
              <p>
                <strong>About:</strong> {member.about}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Active:</strong> {member.isActive ? "Yes" : "No"}
              </p>
              <p>
                <strong>Created:</strong> {member.createDate?.date} at{" "}
                {member.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {member.updateDate?.date} at{" "}
                {member.updateDate?.formatedTime}
              </p>
              <hr style={{margin: "25px 0"}}/>
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

export default Student;
