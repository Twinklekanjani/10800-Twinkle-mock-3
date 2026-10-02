import Complaint from "../models/complaint.js";
import mongoose from "mongoose";

const createComplaint = async (req, res) => {
    try {
        const {
            studentName,
            email,
            title,
            description,
            category,
            priority,
            location
        } = req.body;

        if (
            !studentName ||
            !email ||
            !title ||
            !description ||
            !category ||
            !priority ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required"
            });
        }

        const complaint = await Complaint.create({
            studentName,
            email,
            title,
            description,
            category,
            priority,
            location
        });

        res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            data: complaint
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getComplaints = async (req, res) => {
    try {
        const { status, category, priority, search } = req.query;

        let filter = {};

        if (status) {
            filter.status = status;
        }

        if (category) {
            filter.category = category;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    studentName: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const complaints = await Complaint.find(filter).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint ID"
            });
        }

        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            data: complaint
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint ID"
            });
        }

        const allowedFields = [
            "studentName",
            "email",
            "title",
            "description",
            "category",
            "priority",
            "location"
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            data: complaint
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "Open",
            "In Progress",
            "Resolved",
            "Rejected"
        ];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint ID"
            });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status: status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint status updated successfully",
            data: complaint
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint ID"
            });
        }

        const complaint = await Complaint.findByIdAndDelete(id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaint,
    updateStatus,
    deleteComplaint
};