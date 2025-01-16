"use client"

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analytics() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [gradeData, setGradeData] = useState([]);
  
    useEffect(() => {
      const fetchAnalytics = async () => {
        try {
          const response = await axios.get("http://localhost:5000/students/analytics");
          setAttendanceData(response.data.attendance);
          setGradeData(response.data.grades);
        } catch (error) {
          console.error("Error fetching analytics data:", error);
        }
      };
  
      fetchAnalytics();
    }, []);
  
    function generateRandomColors(count) {
      const colors = new Set();
      while (colors.size < count) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
        colors.add(randomColor);
      }
      return Array.from(colors);
    }

    const attendanceChartData = {
      labels: attendanceData.map((item) => item.attendance_range), // Use attendance_range for labels
      datasets: [
        {
          label: "Attendance Distribution",
          data: attendanceData.map((item) => item.count),
          backgroundColor: generateRandomColors(attendanceData.length),
        },
      ],
    };
  
    const gradeChartData = {
      labels: gradeData.map((item) => item.grade_range),
      datasets: [
        {
          label: "Grade Distribution",
          data: gradeData.map((item) => item.count),
          backgroundColor: "#36A2EB",
        },
      ],
    };
  
    return (
      <div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Attendance Distribution</h2>
          <Pie data={attendanceChartData} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Grade Distribution</h2>
          <Bar data={gradeChartData} />
        </div>
      </div>
    </div>      </div>
    );
  }
  