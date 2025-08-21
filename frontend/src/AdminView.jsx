import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./AdminView.css"; // ✅ Import CSS for styling

const AdminView = () => {
  const [worklogs, setWorklogs] = useState([]);
  const [facultyID, setFacultyID] = useState(""); // Faculty ID filter input

  // ✅ Fetch all worklogs when the component loads
  useEffect(() => {
    fetchAllWorklogs();
  }, []);

  const fetchAllWorklogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/worklogs");
      setWorklogs(response.data);
    } catch (error) {
      console.error("❌ Error fetching worklogs:", error);
    }
  };

  // ✅ Fetch worklogs by Faculty ID
  const fetchFilteredWorklogs = async () => {
    if (facultyID.trim() === "") {
      fetchAllWorklogs(); // Show all if no faculty ID is entered
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/worklogs/faculty/${facultyID.trim()}`
      );
      setWorklogs(response.data);
    } catch (error) {
      console.error("❌ Error fetching filtered worklogs:", error);
      setWorklogs([]); // Clear table if no results found
    }
  };

  // ✅ Generate PDF Report
  const generatePDF = () => {
    if (worklogs.length === 0) {
      alert("No worklogs available to generate a report.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Faculty Worklog Report", 20, 10);

    autoTable(doc, {
      head: [["Faculty ID", "Faculty Name", "Work Type", "Status", "Cluster"]],
      body: worklogs.map((log) => [
        log.facultyID,
        log.facultyName,
        log.typeOfWork,
        log.status,
        log.cluster,
      ]),
    });

    doc.save(`faculty_report_${facultyID || "all"}.pdf`);
  };

  return (
    <div className="admin-container">
      <h2>Admin Worklogs</h2>

      {/* ✅ Input field for filtering by Faculty ID */}
      <div className="input-group">
        <label>Enter Faculty ID:</label>
        <input
          type="text"
          placeholder="Faculty ID"
          value={facultyID}
          onChange={(e) => setFacultyID(e.target.value)}
        />
        <button onClick={fetchFilteredWorklogs}>Filter</button>
        <button onClick={fetchAllWorklogs}>Show All</button>
      </div>

      {/* ✅ Worklogs Table */}
      <table>
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Faculty Name</th>
            <th>Work Type</th>
            <th>Total Time</th>
            <th>Status</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {worklogs.length > 0 ? (
            worklogs.map((log, index) => (
              <tr key={index}>
                <td>{log.facultyID}</td>
                <td>{log.facultyName}</td>
                <td>{log.typeOfWork}</td>
                <td>{log.totalTime} hrs</td>
                <td>{log.status}</td>
                <td>{log.cluster}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No worklogs found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Generate PDF Button */}
      <button onClick={generatePDF}>Download Report</button>
    </div>
  );
};

export default AdminView;
