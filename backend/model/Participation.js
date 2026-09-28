import mongoose from "mongoose"

const participationSchema  = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    competition:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Competition",
        required:true
    },

    status: {
        type: String,
        enum: ["registered", "submitted", "completed"],
        default: "registered",
    },

    registeredAt: {
        type: Date,
        default: Date.now,
    },

    submission: {
        title: String,
        fileUrl: String,
        submittedAt: Date,
    },
  },
    { timestamps: true }
);

// Prevent duplicate registration
    participationSchema.index(
        { user: 1, competition: 1 },
        { unique: true }
    );


    
const Participation = mongoose.model("Participation", participationSchema)
export default Participation
 

