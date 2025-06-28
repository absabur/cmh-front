import Edit from "@/components/Edit";

const Event = async () => {
  const eventsData = await events();

  return (
    <div>
      <h2>Event List</h2>
      {eventsData.length === 0 ? (
        <p>No event data found.</p>
      ) : (
        <>
          {eventsData.map((event) => (
            <div key={event._id}>
              <Edit model={"event"} id={event._id} />
              <hr />
              <h3>
                {event.title} ({event.titleBangla})
              </h3>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Event Date:</strong> {event.eventDate}
              </p>
              <p>
                <strong>Registration:</strong> {event.registrationStartDate} to{" "}
                {event.registrationEndDate}
              </p>
              <p>
                <strong>Posted By:</strong> {event.postedBy?.name} (
                {event.postedBy?.email})
              </p>
              <p>
                <strong>Created At:</strong> {event.createDate?.date}{" "}
                {event.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated At:</strong> {event.updateDate?.date}{" "}
                {event.updateDate?.formatedTime}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Event;

// fetcher function
const events = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();
  return data.events;
};
