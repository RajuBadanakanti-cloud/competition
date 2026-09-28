import mongoose from "mongoose";
import User from "../model/User.js"
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js"

export const createUser = catchAsync(async (req, res, next) => {
    const {name, age, email} = req.body;
    if(!name || !age || !email){
        return next(new AppError("All fields are required!", 400))
    }
    // name
    if(name.length < 2){
        return next(new AppError("Please enter full name!", 400))
    }
    // age 
    if(age < 13){
        return next(new AppError("your age is not eligible!",400))
    }
    
    // email
    const emailExist = await User.findOne({email})
    if(emailExist)return next(new AppError("email already exist!", 400))
        
    const user = await User.create({
        name,
        age, 
        email
    })

    res.status(201).json({
        success:true,
        message:"User successfully created",
        user
    })

})

// get user by id >>
export const getUser = catchAsync(async(req, res, next) => {
    const id = req.params.id 
    if(!mongoose.isValidObjectId(id))return next(new AppError("Invalid User", 400))
    const user = await User.findById(id)
    if(!user)return next(new AppError("User not found!", 404))

    res.status(200).json({
        success:true,
        message:"Your user is here",
        user
    })
})


// there all are optional  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const getAllUsers = catchAsync(async (req,res, next) => {
    const users = await User.find().select("name age email")
    if(users.length < 1)return next(new AppError("No users found!", 404))
    res.status(200).json({
        success:true,
        users
    })
})


// imp update
export const updateUser = catchAsync(async(req, res, next) => {
    const id = req.params.id 
    const{name, age, email} = req.body
    if (name === undefined && age === undefined && email === undefined) {
        return next(new AppError("At least one field is required!", 400));
    }    

if(!mongoose.isValidObjectId(id))return next(new AppError("Invalid User", 400))
        
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = age;
    if (email !== undefined) updateData.email = email;

    const user = await User.findByIdAndUpdate(id,  {$set:updateData}, {new:true, runValidators:true}) // imp
    if(!user)return next(new AppError("User not found!", 404))

    res.status(200).json({
        success:true,
        message:"User successfully updated",
        user
    })
})

// delete user >>>>>>>>>
export const deleteUser = catchAsync(async (req, res, next) => {
    const id = req.params.id 
    if(!mongoose.isValidObjectId(id))return next(new AppError("Invalid User", 400))
    const user = await User.findByIdAndDelete(id)
    if(!user)return next(new AppError("User not found!", 404))

    res.status(200).json({
        success:true,
        message:"user successfully deleted!",
        user
    })
})