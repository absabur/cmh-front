import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/${id}`,
    {
      cache: "no-store", // optional: ensures latest data in dev mode
    }
  );

  const data = await response.json();
  const student = data.student;

  return (
    <div>
      <h1>{student.name}</h1>
      {student.avatar && (
        <img
          src={`${student.avatar.url}`}
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
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Phone:</strong> {student.phone}
      </p>
      <p>
        <strong>Type:</strong> {student.type}
      </p>
      <p>
        <strong>Profession:</strong> {student.profession}
      </p>
      <p>
        <strong>Batch:</strong> {student.batch?.name}
      </p>
      <p>
        <strong>About:</strong> {student.about}
      </p>
      <p>
        <strong>Address:</strong> {student.address}
      </p>
      <p>
        <strong>Active:</strong> {student.isActive ? "Yes" : "No"}
      </p>
      <p>
        <strong>Created:</strong> {student.createDate?.date} at{" "}
        {student.createDate?.formatedTime}
      </p>
      <p>
        <strong>Updated:</strong> {student.updateDate?.date} at{" "}
        {student.updateDate?.formatedTime}
      </p>
      <hr style={{margin: "25px 0"}}/>
    </div>
  );
};
export default Page;
