const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/worklogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ Connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ✅ Define Schema & Model
const WorklogSchema = new mongoose.Schema({
  facultyName: { type: String, required: true },
  facultyID: { type: String, required: true },
  cluster: { type: String, required: true },
  typeOfWork: { type: String, required: true },
  totalTime: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

const Worklog = mongoose.model("Worklog", WorklogSchema);

// ✅ API: Submit a New Worklog
app.post("/submit-worklog", async (req, res) => {
  try {
    console.log("📩 Received Worklog Data:", req.body);
    const newWorklog = new Worklog(req.body);
    await newWorklog.save();
    console.log("✅ Worklog Saved:", newWorklog);
    res.status(201).json({ message: "Worklog submitted!", data: newWorklog });
  } catch (error) {
    console.error("❌ Error submitting worklog:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ API: Fetch All Worklogs
app.get("/worklogs", async (req, res) => {
  try {
    const worklogs = await Worklog.find();
    res.json(worklogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API: Fetch Worklogs by Faculty ID
app.get("/worklogs/faculty/:facultyID", async (req, res) => {
  try {
    const { facultyID } = req.params;
    const worklogs = await Worklog.find({ facultyID: facultyID.trim() });

    if (worklogs.length === 0) {
      return res.status(404).json({ message: "No worklogs found for this Faculty ID" });
    }

    res.json(worklogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API: Update Worklog Status
app.put("/worklogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedWorklog = await Worklog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedWorklog) {
      return res.status(404).json({ message: "Worklog not found" });
    }

    console.log("✅ Worklog Updated:", updatedWorklog);
    res.json({ message: "Worklog status updated", data: updatedWorklog });
  } catch (error) {
    console.error("❌ Error updating worklog:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ API: Delete a Worklog
app.delete("/worklogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorklog = await Worklog.findByIdAndDelete(id);

    if (!deletedWorklog) {
      return res.status(404).json({ message: "Worklog not found" });
    }

    console.log("❌ Worklog Deleted:", deletedWorklog);
    res.json({ message: "Worklog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting worklog:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
