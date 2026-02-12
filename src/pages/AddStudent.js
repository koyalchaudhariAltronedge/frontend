import { useState } from "react";
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
    role: "STUDENT",
  });

  const saveStudent = async () => {

    if (
      !student.name ||
      !student.email ||
      !student.phone ||
      !student.course ||
      !student.password ||
      !student.role
    ) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8088/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student added successfully!");
      } else {
        alert("Failed to add student!");
      }
    } catch (error) {
      alert("Server Error / Backend Not Running!");
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>

      <div className="form-box">

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => setStudent({ ...student, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Course"
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setStudent({ ...student, password: e.target.value })}
        />

        <select
          onChange={(e) => setStudent({ ...student, role: e.target.value })}
        >
          <option value="">-- Select Role --</option>
          <option value="STUDENT">Student</option>
        </select>

        <button onClick={saveStudent}>Save Student</button>
      </div>
    </div>
  );
}

export default AddStudent;