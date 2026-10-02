import express from "express";

const router = express.Router();

const {
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaint,
    updateStatus,
    deleteComplaint
} = import("../controllers/complaintcontroller.js");

router.post("/", createComplaint);

router.get("/", getComplaints);

router.get("/:id", getComplaintById);

router.put("/:id", updateComplaint);

router.patch("/:id/status", updateStatus);

router.delete("/:id", deleteComplaint);

export default router;