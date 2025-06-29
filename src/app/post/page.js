"use client";

import { useEffect, useState } from "react";
import Edit from "@/components/Edit";
import Link from "next/link";

const Post = () => {
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // Customize as needed
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setPostsData(data.posts);
      setTotal(data.total);
    };

    fetchPosts();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Post List</h2>
      {postsData.length === 0 ? (
        <p>No post data found.</p>
      ) : (
        <>
          {postsData.map((post) => (
            <div key={post._id}>
              <Edit model={"post"} id={post._id} />
              <Link href={`/post/${post._id}`}>
                <>title: {post.title}</>
              </Link>
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              <p>
                <strong>YouTube Link:</strong>{" "}
                <a
                  href={post.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.youtubeLink}
                </a>
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {post.images.map((image) => (
                  <img
                    key={image.url}
                    src={image.url}
                    alt="Post"
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

export default Post;
