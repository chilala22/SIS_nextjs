import axios from "axios";

// Base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Fetch students
export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students`);
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Add a student
export const addStudent = async (student) => {
  try {
    await axios.post(`${BASE_URL}/students`, student);
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Edit a student
export const editStudent = async (id, student) => {
  try {
    await axios.put(`${BASE_URL}/students/${id}`, student);
  } catch (error) {
    console.error("Error editing student:", error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/students/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
