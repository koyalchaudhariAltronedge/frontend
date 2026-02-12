import React, { useState } from "react";
import "./AddTeacher.css";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    role: "",
    password: ""
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (
      !teacher.name ||
      !teacher.email ||
      !teacher.phone ||
      !teacher.subject ||
      !teacher.role ||
      !teacher.password
    ) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    fetch("http://localhost:8088/teacher/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Teacher added successfully!");
        setTeacher({
          name: "",
          email: "",
          phone: "",
          subject: "",
          password: "",
          role: "",
        });
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="add-teacher-container">
      <h2>Add Teacher</h2>

      <div className="form-box">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={teacher.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={teacher.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={teacher.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={teacher.subject}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={teacher.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={teacher.role}
          onChange={handleChange}
        >
          <option value="">-- Select Role --</option>
          <option value="TEACHER">Teacher</option>
        </select>

        <button onClick={handleSubmit}>Save Teacher</button>
      </div>
    </div>
  );
};

export default AddTeacher;