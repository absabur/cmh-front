import Edit from "@/components/Edit";

const Notice = async () => {
  const noticesData = await notices();

  return (
    <div>
      <h2>Notice List</h2>
      {noticesData.length === 0 ? (
        <p>No notice data found.</p>
      ) : (
        <>
          {noticesData.map((notice) => (
            <div key={notice._id}>
              <Edit model={"notice"} id={notice._id} />
              <h3>{notice.title}</h3>
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
                {notice.images.map((image, index) => (
                  <img
                    key={Math.random()}
                    src={`${image.url}`}
                    alt="Notice"
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
        </>
      )}
    </div>
  );
};

export default Notice;

// fetcher function
const notices = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notice`
  );
  const data = await response.json();
  return data.notices;
};
