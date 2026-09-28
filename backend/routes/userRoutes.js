import express from "express"
import { createUser, deleteUser, getUser, getAllUsers, updateUser } from "../controllers/userController.js"

const router = express.Router()

router.route("/create").post(createUser)
router.route("/:id").get(getUser)
router.route("/:id").patch(updateUser)
router.route("/:id").delete(deleteUser)

router.route("/").get(getAllUsers)// get all users >>


export default router