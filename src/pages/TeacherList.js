import React, { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    fetch("http://localhost:8088/teacher/getAll")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.log("Error:", err));
  };

  const deleteTeacher = (id) => {
    if (window.confirm("Delete this teacher?")) {
      fetch(`http://localhost:8088/teacher/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Teacher deleted");
          fetchTeachers();
        })
        .catch((err) => console.log("Delete Error:", err));
    }
  };

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.phone.includes(search) ||
    (t.subject && t.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h2>Teacher List</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.subject}</td>
              <td>
                <button onClick={() => deleteTeacher(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Teachers;