import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Login from "./components/Login";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import AddTeacher from "./pages/AddTeacher";
import EditTeacher from "./pages/EditTeacher";
import CoursePage from "./pages/CoursePage";
import Contact from "./pages/Contact";



function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-teacher" element={<AddTeacher/>} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/courses" element={<CoursePage/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;