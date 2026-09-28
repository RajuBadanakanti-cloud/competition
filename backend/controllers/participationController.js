import mongoose from "mongoose";
import Participation from "../model/Participation.js";
import User from "../model/User.js";
import Competition from "../model/Competition.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

// Register user for a competition
export const registerForCompetition = catchAsync(async (req, res, next) => {
    const { userId, competitionId } = req.body;

    if (!userId || !competitionId) {
        return next(
            new AppError("User ID and Competition ID are required!", 400)
        );
    }

    
    if (!mongoose.isValidObjectId(userId)) {
        return next(new AppError("Invalid User ID", 400));
    }

    if (!mongoose.isValidObjectId(competitionId)) {
        return next(new AppError("Invalid Competition ID", 400));
    }

    // Check user exists
    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    // Check duplicate registration first
    const alreadyRegistered = await Participation.findOne({
        user: userId,
        competition: competitionId
    });

    if (alreadyRegistered) {
        return next(
            new AppError(
                "User already registered for this competition!",
                409
            )
        );
    }

    // Atomically reserve one competition spot
    const competition = await Competition.findOneAndUpdate(
        {
            _id: competitionId,

            // Registration must currently be open
            registrationStart: { $lte: new Date() },
            registrationEnd: { $gte: new Date() },

            // Only update when a spot is available
            $expr: {
                $lt: ["$registeredCount", "$maxParticipants"]
            }
        },
        {
            $inc: {
                registeredCount: 1
            }
        },
        {
            new: true
        }
    );

    // No competition / no available spot / registration closed
    if (!competition) {
        return next(
            new AppError(
                "Registration closed or competition is full!",
                400
            )
        );
    }

    // Create participation
    try {
        const participation = await Participation.create({
            user: userId,
            competition: competitionId
        });

        res.status(201).json({
            success: true,
            message: "Successfully registered for competition",
            participation
        });

    } catch (error) {

        // If duplicate registration happens concurrently,
        // restore the reserved spot.
        if (error.code === 11000) {
            await Competition.findByIdAndUpdate(
                competitionId,
                { $inc: { registeredCount: -1 } }
            );

            return next(
                new AppError(
                    "User already registered for this competition!",
                    409
                )
            );
        }

        // Restore spot if participation creation fails
        await Competition.findByIdAndUpdate(
            competitionId,
            { $inc: { registeredCount: -1 } }
        );

        throw error;
    }
});


// Get participation by ID
export const getParticipation = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid Participation ID", 400));
    }

    const participation = await Participation.findById(id)
        .populate("user")
        .populate("competition");

    if (!participation) {
        return next(new AppError("Participation not found!", 404));
    }

    res.status(200).json({
        success: true,
        participation
    });
});


// Get all participations
export const getParticipations = catchAsync(async (req, res, next) => {

    const participations = await Participation.find()
        .populate("user")
        .populate({
            path: "competition",
            select: "title description prizePool entryFee status"
        }); // imp

    if (participations.length < 1) {
        return next(new AppError(
            "Participations not found!",
            404
        ));
    }

    res.status(200).json({
        success: true,
        participations
    });
});


// Get user's competitions
export const getUserParticipations = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        return next(new AppError("Invalid User ID", 400));
    }

    const participations = await Participation.find({
        user: userId
    })
        .populate("competition");

    if (participations.length < 1) {
        return next(new AppError(
            "No competitions found for this user!",
            404
        ));
    }

    res.status(200).json({
        success: true,
        participations
    });
});


// Update participation
export const updateParticipation = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status, submission } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid Participation ID", 400));
    }

    if (status === undefined && submission === undefined) {
        return next(new AppError(
            "At least one field is required!",
            400
        ));
    }

    const updateData = {};

    if (status !== undefined) {
        updateData.status = status;
    }

    if (submission !== undefined) {
        updateData.submission = submission;
    }

    const participation = await Participation.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    )
        .populate("user")
        .populate("competition");

    if (!participation) {
        return next(new AppError(
            "Participation not found!",
            404
        ));
    }

    res.status(200).json({
        success: true,
        message: "Participation successfully updated",
        participation
    });
});


// Delete / cancel participation
export const deleteParticipation = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid Participation ID", 400));
    }

    const participation = await Participation.findByIdAndDelete(id);

    if (!participation) {
        return next(new AppError(
            "Participation not found!",
            404
        ));
    }

    res.status(200).json({
        success: true,
        message: "Participation successfully deleted",
        participation
    });
});


// ParticipationSubmitions  >>>>>>>>>>>>>>>>>>>>>>
export const submitCompetition = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, fileUrl } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid participation ID", 400));
    }

    const participation = await Participation.findById(id)
        .populate("competition");

    if (!participation) {
        return next(new AppError("Participation not found!", 404));
    }

    // User must be registered
    if (participation.status !== "registered") {
        return next(new AppError("Invalid participation status", 400));
    }

    const competition = participation.competition;
    const now = new Date();

    // Check submission period
    if (
        now < competition.submissionStart ||
        now > competition.submissionEnd
    ) {
        return next(new AppError("Submission period is closed!", 400));
    }

    // Prevent duplicate submission
    if (participation.submission?.fileUrl) {
        return next(new AppError("Submission already exists!", 409));
    }

    participation.submission = {
        title,
        fileUrl,
        submittedAt: now
    };

    participation.status = "submitted";

    await participation.save();

    res.status(201).json({
        success: true,
        message: "Submission successfully created",
        participation
    });
});