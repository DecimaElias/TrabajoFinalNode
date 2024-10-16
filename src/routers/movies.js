import { Router } from "express";
import { movieController } from "../controllers/movies.js";
import {verifyAccessToken} from "../middlewares/VerifyAccessToken.js"
export const router = Router()

router.get("/", movieController.getAll)
router.get("/s", movieController.getByTitle)
router.get("/:id", movieController.getById)
router.post("/", verifyAccessToken, movieController.createOne)
router.patch("/:id", verifyAccessToken, movieController.updateOne)
router.delete("/:id", verifyAccessToken, movieController.deleteOne)