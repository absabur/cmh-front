import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/${id}`,
    {
      cache: "no-store", // optional: ensures latest data in dev mode
    }
  );

  const data = await response.json();
  const post = data.post;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>

      <p>
        <strong>Content:</strong> {post.content}
      </p>

      <p>
        <strong>YouTube Link:</strong>{" "}
        <a href={post.youtubeLink} target="_blank" rel="noopener noreferrer">
          {post.youtubeLink}
        </a>
      </p>

      <p>
        <strong>Posted By:</strong> {post.postedBy?.name} ({post.postedBy?.email})
      </p>

      <p>
        <strong>Created:</strong> {post.createDate?.date} at {post.createDate?.formatedTime}
      </p>

      <p>
        <strong>Updated:</strong> {post.updateDate?.date} at {post.updateDate?.formatedTime}
      </p>

      <p>
        <strong>Images:</strong>{" "}
        {post.images?.length > 0 ? (
          post.images.map((img, i) => (
            <img
              key={img.url || i}
              src={img.url}
              alt={`Post image ${i + 1}`}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
                objectFit: "contain",
              }}
            />
          ))
        ) : (
          "No images"
        )}
      </p>
    </div>
  );
};

export default Page;
