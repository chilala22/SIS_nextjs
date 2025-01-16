'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FilterStudent() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
      className: "",
      minGrade: "",
      maxGrade: "",
    });
  
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students", {
          params: filters,
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    useEffect(() => {
      fetchStudents();
    }, [filters]);
  
    const filteredStudents = students.filter((student) => {
      const matchesSearch = student.name ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const matchesClass = filters.className ? student.class === filters.className : true;
      const matchesGrade =
        (filters.minGrade ? student.grade >= parseInt(filters.minGrade, 10) : true) &&
        (filters.maxGrade ? student.grade <= parseInt(filters.maxGrade, 10) : true);
      return matchesSearch && matchesClass && matchesGrade;
    });
  
    const handleReset = () => {
      setSearchTerm("");
      setFilters({ className: "", minGrade: "", maxGrade: "" });
    };
    return (
      <div>
          <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">School Management Dashboard</h1>

      <div className="flex gap-4 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />

        {/* Filter by Class */}
        <select
          value={filters.className}
          onChange={(e) => setFilters({ ...filters, className: e.target.value })}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Classes</option>
          <option value="10A">Class 10A</option>
          <option value="10B">Class 10B</option>
          <option value="11A">Class 11A</option>
          <option value="11B">Class 11B</option>
        </select>

        {/* Filter by Grade */}
        <input
          type="number"
          placeholder="Min Grade"
          value={filters.minGrade}
          onChange={(e) => setFilters({ ...filters, minGrade: e.target.value })}
          className="border px-4 py-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Max Grade"
          value={filters.maxGrade}
          onChange={(e) => setFilters({ ...filters, maxGrade: e.target.value })}
          className="border px-4 py-2 rounded w-1/3"
        />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Grade</th>
            <th className="border border-gray-300 px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2">{student.class}</td>
                <td className="border border-gray-300 px-4 py-2">{student.grade}</td>
                <td className="border border-gray-300 px-4 py-2">{student.attendance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
      </div>
    );
  }
  