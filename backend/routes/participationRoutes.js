import express from "express";

import {
    registerForCompetition,
    getParticipation,
    getParticipations,
    getUserParticipations,
    updateParticipation,
    deleteParticipation,
    submitCompetition
} from "../controllers/participationController.js";

const router = express.Router();

    router.post("/", registerForCompetition);
    router.get("/", getParticipations); //  get all >>>
    router.get("/user/:userId", getUserParticipations); // user along with its paricipation
    router.get("/:id", getParticipation); // only participations
    router.patch("/:id", updateParticipation);
    router.delete("/:id", deleteParticipation);

    router.post("/:id/submission", submitCompetition); // submition

export default router;