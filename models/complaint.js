import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Infrastructure",
                "IT",
                "Cleanliness",
                "Security",
                "Other"
            ]
        },

        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High"]
        },

        location: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Open",
                "In Progress",
                "Resolved",
                "Rejected"
            ],
            default: "Open"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Complaint", complaintSchema);




