import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },

            description: {
                type: String,
                required: true,
            },

            prizePool: {
                type: Number,
                required: true,
            },

            entryFee: {
                type: Number,
                required: true,
                default: 0,
            },

            maxParticipants: {
                type: Number,
                required: true,
            },

            registrationStart: {
                type: Date,
                required: true,
            },

            registrationEnd: {
                type: Date,
                required: true,
            },

            submissionStart: {
                type: Date,
                required: true,
            },

            submissionEnd: {
                type: Date,
                required: true,
            },

            status: {
                type: String,
            enum: [
                    "upcoming",
                    "registration_open",
                    "registration_closed",
                    "submission_open",
                    "completed",
                ],
            default: "upcoming",
            },

            judge: {
                name: String,
                image: String,
                experience: String,
            },
            rewards: [
                {
                    rank: Number,
                    title: String,
                    amount: Number,
                },
            ],
            rules: [String],
            judgingParameters: [String],
            previousWinners: [
                    {
                        name: String,
                        image: String,
                        rank: Number,
                    },
            ],
            // registration concurrency protection like limited slots
            registeredCount: {
                type: Number,
                default: 0,
                min: 0
        },
        },


        { timestamps: true }
);

const Competition = mongoose.model("Competition", competitionSchema);
export default Competition