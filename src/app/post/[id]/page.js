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
        <strong>YouTube Video:</strong>
      </p>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${getYouTubeID(
            post.youtubeLink
          )}`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p>
        <strong>Posted By:</strong> {post.postedBy?.name} (
        {post.postedBy?.email})
      </p>

      <p>
        <strong>Created:</strong> {post.createDate?.date} at{" "}
        {post.createDate?.formatedTime}
      </p>

      <p>
        <strong>Updated:</strong> {post.updateDate?.date} at{" "}
        {post.updateDate?.formatedTime}
      </p>

      <p>
        <strong>Images:</strong>{" "}
        {post.images?.length > 0
          ? post.images.map((img, i) => (
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
          : "No images"}
      </p>
    </div>
  );
};

export default Page;

function getYouTubeID(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}
