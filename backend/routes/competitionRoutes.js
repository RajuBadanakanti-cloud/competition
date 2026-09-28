import express from "express";
import {
    createCompetition,
    getCompetition,
    getAllCompetitions,
    updateCompetition,
    deleteCompetition
} from "../controllers/competitionController.js";

const router = express.Router();

    router.post("/", createCompetition);
    router.get("/", getAllCompetitions); // get all competitions
    router.get("/:id", getCompetition);
    router.patch("/:id", updateCompetition);
    router.delete("/:id", deleteCompetition);

export default router;