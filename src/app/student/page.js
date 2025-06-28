import Edit from "@/components/Edit";

const Student = async () => {
  const studentsData = await students();
  return (
    <div>
      <h2>Student List</h2>
      {studentsData.length === 0 ? (
        <p>No student data found.</p>
      ) : (
        <>
          {studentsData.map((member) => (
            <div key={member._id}>
              <Edit model={"student"} id={member._id} />
              <h3>{member.name}</h3>
              {member.avatar && (
                <img
                  src={`${member.avatar.url}`}
                  alt="Student Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              )}
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Type:</strong> {member.type}
              </p>
              <p>
                <strong>Profession:</strong> {member.profession}
              </p>
              <p>
                <strong>Batch:</strong> {member.batch?.name}
              </p>
              <p>
                <strong>About:</strong> {member.about}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Approved:</strong> {member.isApproved ? "Yes" : "No"}
              </p>
              <p>
                <strong>Active:</strong> {member.isActive ? "Yes" : "No"}
              </p>
              <p>
                <strong>Created:</strong> {member.createDate?.date} at{" "}
                {member.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {member.updateDate?.date} at{" "}
                {member.updateDate?.formatedTime}
              </p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Student;

// fetcher function
const students = async (dispatch) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student`
  );
  const data = await response.json();
  return data.students;
};
