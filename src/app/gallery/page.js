"use client";

import { useEffect, useState } from "react";
import Edit from "@/components/Edit";

const Gallery = () => {
  const [galleriesData, setGalleriesData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchGalleries = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setGalleriesData(data.galleries);
      setTotal(data.total);
    };

    fetchGalleries();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Gallery List</h2>
      {galleriesData.length === 0 ? (
        <p>No gallery data found.</p>
      ) : (
        <>
          {galleriesData.map((item) => (
            <div key={item._id}>
              <Edit model="gallery" id={item._id} />
              <h3>{item.title}</h3>
              <p>
                <strong>YouTube Video:</strong>
              </p>
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeID(
                    item.youtubeLink
                  )}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <p>
                <strong>Posted By:</strong> {item.postedBy?.name} (
                {item.postedBy?.email})
              </p>
              <p>
                <strong>Created At:</strong> {item.createDate?.date}{" "}
                {item.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated At:</strong> {item.updateDate?.date}{" "}
                {item.updateDate?.formatedTime}
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {item.images && item.images.length > 0
                  ? item.images.map((image, index) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt={`Gallery Image ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          objectFit: "contain",
                        }}
                      />
                    ))
                  : "No images available"}
              </p>
              <hr style={{margin: "25px 0"}}/>
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

export default Gallery;

function getYouTubeID(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}
