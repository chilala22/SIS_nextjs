'use client'
import React, { useState, useEffect } from "react";
import { fetchStudents,addStudent,editStudent,deleteStudent } from './../utils/api';

export default function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", className: "", grade: "", attendance: "" });
  const [isEdit, setIsEdit] = useState(false);
  
  // Fetch students on load
  useEffect(() => {
    fetchStudents().then((response) => setStudents(response.data));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form inputs
    if (!form.name || !form.className || !form.grade || !form.attendance) {
      alert("All fields are required");
      return;
    }
  
    try {
      if (isEdit) {
        await editStudent(form.id, form);

      } else {
        await addStudent(form);
      }
      setForm({ id: "", name: "", className: "", grade: "", attendance: "" });
      setIsEdit(false);
      fetchStudents().then((response) => setStudents(response.data));
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };
  
  const handleEdit = (student) => {
    setForm(student);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents().then((response) => setStudents(response.data));
  };

  // Filter out students with null or undefined names
  const validStudents = students.filter((student) => student.name);

    return (
      <div>
 <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-4 mb-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="className"
            placeholder="Class"
            value={form.className}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>
        <div className="flex gap-4 mb-2">
          <input
            type="number"
            name="grade"
            placeholder="Grade"
            value={form.grade}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            name="attendance"
            placeholder="Attendance"
            value={form.attendance}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEdit ? "Update Student" : "Add Student"}
        </button>
      </form>
      

      
      <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
  <table className="table-auto w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Class</th>
        <th className="border border-gray-300 px-4 py-2">Grade</th>
        <th className="border border-gray-300 px-4 py-2">Attendance</th>
        <th className="border border-gray-300 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {validStudents.map((student) => (
        <tr key={student.id}>
          <td className="border border-gray-300 px-4 py-2">{student.name}</td>
          <td className="border border-gray-300 px-4 py-2">{student.class}</td>
          <td className="border border-gray-300 px-4 py-2">{student.grade}</td>
          <td className="border border-gray-300 px-4 py-2">{student.attendance}</td>
          <td className="border border-gray-300 px-4 py-2">
            <button
              onClick={() => handleEdit(student)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  </div>      </div>
    );
  }
  