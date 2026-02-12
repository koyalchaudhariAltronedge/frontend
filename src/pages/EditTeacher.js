import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddTeacher.css";

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    password: "",
    role: "TEACHER",
  });

  
  useEffect(() => {
    fetch(`http://localhost:8088/teacher/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Teacher not found");
        return res.json();
      })
      .then(data => {
        
        setTeacher({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          subject: data.subject || "",
          role: data.role || "TEACHER",
          password: "" 
        });
      })
      .catch(err => console.log("Fetch error:", err));
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!teacher.name || !teacher.email || !teacher.phone || !teacher.subject || !teacher.role) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    fetch(`http://localhost:8088/teacher/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Teacher updated successfully!");
        navigate("/teachers");
      })
      .catch(err => console.log("Update error:", err));
  };

  return (
    <div className="add-teacher-container">
      <h2>Edit Teacher</h2>

      <form onSubmit={handleSubmit} className="teacher-form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={teacher.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={teacher.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="phone"
          placeholder="Enter Phone"
          value={teacher.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          value={teacher.subject}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={teacher.password}
          onChange={handleChange}
        />

        
        <select
          name="role"
          value={teacher.role}
          onChange={handleChange}
          required
        >
          <option value="TEACHER">TEACHER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit">Update Teacher</button>
      </form>
    </div>
  );
};

export default EditTeacher;