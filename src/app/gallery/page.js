import Edit from "@/components/Edit";

const Gallery = async () => {
  const galleriesData = await galleries();

  return (
    <div>
      <h2>Gallery List</h2>
      {galleriesData.length === 0 ? (
        <p>No gallery data found.</p>
      ) : (
        <>
          {galleriesData.map((item) => (
            <div key={item._id}>
              <Edit model={"gallery"} id={item._id} />
              <h3>{item.title}</h3>
              <p>
                <strong>YouTube Link:</strong>{" "}
                <a href={item.youtubeLink} target="_blank">
                  {item.youtubeLink}
                </a>
              </p>
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
                        key={index}
                        src={`${image.url}`}
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
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Gallery;

// fetcher function
const galleries = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery`
  );

  const data = await response.json();
  return data.galleries;
};
