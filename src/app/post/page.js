import Edit from "@/components/Edit";

const Post = async () => {
  const postsData = await posts();

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
              <h3>{post.title}</h3>
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              <p>
                <strong>YouTube Link:</strong>{" "}
                <a href={post.youtubeLink} target="_blank">
                  {post.youtubeLink}
                </a>
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {post.images.map((image, index) => (
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

export default Post;

// fetcher function
const posts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`
  );
  const data = await response.json();
  return data.posts;
};
