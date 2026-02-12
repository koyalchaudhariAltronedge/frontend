import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Teachers.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    fetch("http://localhost:8088/teacher/getAll")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTeachers(data);
        else setTeachers([]);
      })
      .catch((err) => console.log("Error:", err));
  };

  const deleteTeacher = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:8088/teacher/delete/${id}`, { method: "DELETE" })
        .then(() => {
          alert("Teacher deleted successfully");
          fetchTeachers();
        })
        .catch((err) => console.log("Error:", err));
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.phone.toString().includes(search) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teachers-page">
      <h2 className="title">Teacher List</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTeachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.subject}</td>
              <td>{t.role}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-teacher/${t.id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTeacher(t.id)}
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

export default Teachers;