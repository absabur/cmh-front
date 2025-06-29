import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notice/${id}`,
    {
      cache: "no-store", // ensures latest data in dev
    }
  );

  const data = await response.json();
  const notice = data.notice;

  if (!notice) {
    return <div>Notice not found.</div>;
  }

  return (
    <div>
      <h2>{notice.title}</h2>

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
        {notice.images?.length > 0
          ? notice.images.map((img, index) => (
              <img
                key={img.url || index}
                src={img.url}
                alt={`Notice image ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                  objectFit: "contain",
                }}
              />
            ))
          : "No images"}
      </p>
    </div>
  );
};

export default Page;
