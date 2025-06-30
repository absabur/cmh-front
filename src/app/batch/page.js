import Edit from "@/components/Edit";

const Batch = async () => {
  const batchesData = await batches();
  return (
    <div>
      <h2>Batch List</h2>
      {batchesData.length === 0 ? (
        <p>No batch data found.</p>
      ) : (
        <>
          {batchesData?.map((batch) => (
            <div key={batch._id}>
              <hr style={{margin: "25px 0"}}/>
              <Edit model={"batch"} id={batch._id} />
              <strong>Name:</strong> {batch.name} <br />
              <strong>Created:</strong> {batch.createDate?.date} at{" "}
              {batch.createDate?.formatedTime} <br />
              <strong>Updated:</strong> {batch.updateDate?.date} at{" "}
              {batch.updateDate?.formatedTime}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Batch;

// fetcher function
const batches = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch/`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch batches");
  }
  const data = await response.json();
  return data.batches;
};
