import React, { useEffect, useState } from "react";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch("http://localhost:8088/api/students")
      .then((res) => res.json())
      .then((data) => {


        const onlyStudents = data.filter(s => s.role === "STUDENT");

        setStudents(onlyStudents);
      })
      .catch((err) => console.log("Error:", err));
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:8088/api/students/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Student deleted successfully");
          fetchStudents();
        })
        .catch((err) => console.log("Delete Error:", err));
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.toString().includes(search) ||
    s.course.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <h2 className="title">Student List</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "180px",
            borderRadius: "5px",
            border: "1px solid gray"
          }}
        />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.course}</td>
              <td>{s.role.toUpperCase()}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => (window.location.href = `/edit-student/${s.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(s.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Students;