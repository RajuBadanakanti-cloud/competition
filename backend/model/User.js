import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age:{
        type:Number,
        required:true,
        min:5
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
        lowercase: true,
        trim: true,
    },
  },

  { timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true} }
);


const User = mongoose.model("User", userSchema)
export default User