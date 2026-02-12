import React, { useState, useEffect } from "react";
import "./CoursePage.css";

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);


  const loadCourses = async () => {
    const res = await fetch("http://localhost:8088/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

 
  const saveCourse = async (e) => {
    e.preventDefault();

    const course = { courseName, courseCode, description };

    let url = "http://localhost:8088/api/courses";
    let method = "POST";

    if (editId != null) {
      url = `http://localhost:8088/api/courses/${editId}`;
      method = "PUT";
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });

    setCourseName("");
    setCourseCode("");
    setDescription("");
    setEditId(null);

    loadCourses();
  };

  // DELETE
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    await fetch(`http://localhost:8088/api/courses/${id}`, { method: "DELETE" });
    loadCourses();
  };

  // EDIT
  const editCourse = (c) => {
    setCourseName(c.courseName);
    setCourseCode(c.courseCode);
    setDescription(c.description);
    setEditId(c.id);
  };

  return (
    <div className="course-page">
      <h2 className="title">Course Management</h2>

      <form onSubmit={saveCourse} className="course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="add-btn">
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <h3 className="list-title">All Courses</h3>

      <div className="table-wrapper">
        <table className="course-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.courseName}</td>
                <td>{c.courseCode}</td>
                <td>{c.description}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => editCourse(c)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteCourse(c.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursePage;