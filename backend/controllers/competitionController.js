import mongoose from "mongoose";
import Competition from "../model/Competition.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {getCompetitionStatus} from "../utils/getCompetitionStatus.js"

// Create competition
export const createCompetition = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        prizePool,
        entryFee,
        maxParticipants,
        registrationStart,
        registrationEnd,
        submissionStart,
        submissionEnd,
        status,
        judge,
        rewards,
        rules,
        judgingParameters,
        previousWinners
    } = req.body;


    const competition = await Competition.create({
        title,
        description,
        prizePool,
        entryFee,
        maxParticipants,
        registrationStart,
        registrationEnd,
        submissionStart,
        submissionEnd,
        status,
        judge,
        rewards,
        rules,
        judgingParameters,
        previousWinners
    });

    res.status(201).json({
        success: true,
        message: "Competition successfully created",
        competition
    });
});


// Get competition by ID
export const getCompetition = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid competition ID", 400));
    }

    const competition = await Competition.findById(id);

    if (!competition) {
        return next(new AppError("Competition not found!", 404));
    }

    const currentStatus = getCompetitionStatus(competition)

    res.status(200).json({
        success: true,
        message: "Competition found",
        competition:{
            ...competition.toObject(),
            status:currentStatus
        }
    });
});


// Get all competitions
export const getAllCompetitions = catchAsync(async (req, res, next) => {

    const competitions = await Competition.find();

    if (competitions.length < 1) {
        return next(new AppError("No Competitions found!", 404));
    }

    res.status(200).json({
        success: true,
        competitions
    });
});


// Update competition
export const updateCompetition = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const {
        title,
        description,
        prizePool,
        entryFee,
        maxParticipants,
        registrationStart,
        registrationEnd,
        submissionStart,
        submissionEnd,
        status,
        judge,
        rewards,
        rules,
        judgingParameters,
        previousWinners
    } = req.body;

    // At least one field must be provided
    if (
        title === undefined &&
        description === undefined &&
        prizePool === undefined &&
        entryFee === undefined &&
        maxParticipants === undefined &&
        registrationStart === undefined &&
        registrationEnd === undefined &&
        submissionStart === undefined &&
        submissionEnd === undefined &&
        status === undefined &&
        judge === undefined &&
        rewards === undefined &&
        rules === undefined &&
        judgingParameters === undefined &&
        previousWinners === undefined
    ) {
        return next(
            new AppError("At least one field is required!", 400)
        );
    }

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid competition ID", 400));
    }

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (prizePool !== undefined) updateData.prizePool = prizePool;
    if (entryFee !== undefined) updateData.entryFee = entryFee;
    if (maxParticipants !== undefined) {
        updateData.maxParticipants = maxParticipants;
    }

    if (registrationStart !== undefined) {
        updateData.registrationStart = registrationStart;
    }

    if (registrationEnd !== undefined) {
        updateData.registrationEnd = registrationEnd;
    }

    if (submissionStart !== undefined) {
        updateData.submissionStart = submissionStart;
    }

    if (submissionEnd !== undefined) {
        updateData.submissionEnd = submissionEnd;
    }

    if (status !== undefined) updateData.status = status;
    if (judge !== undefined) updateData.judge = judge;
    if (rewards !== undefined) updateData.rewards = rewards;
    if (rules !== undefined) updateData.rules = rules;

    if (judgingParameters !== undefined) {
        updateData.judgingParameters = judgingParameters;
    }

    if (previousWinners !== undefined) {
        updateData.previousWinners = previousWinners;
    }

    const competition = await Competition.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );

    if (!competition) {
        return next(new AppError("Competition not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Competition successfully updated",
        competition
    });
});


// Delete competition
export const deleteCompetition = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid competition ID", 400));
    }

    const competition = await Competition.findByIdAndDelete(id).select("title description prizePool status judge rewards");

    if (!competition) {
        return next(new AppError("Competition not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Competition successfully deleted",
        competition
    });
});