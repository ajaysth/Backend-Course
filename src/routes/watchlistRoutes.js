import express from "express";
import {addToWatchlist, deleteFromWatchlist, updateWatchlistItem} from "../controller//watchlistController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { validaterequest } from "../middleware/validateRequest.js";
import { watchlistAddSchema,watchlistUpdateSchema } from "../validator/watchlistValidators.js";

const router = express.Router();
router.use(authMiddleware) // Apply authentication middleware to all routes in this router

router.post("/",validaterequest(watchlistAddSchema),addToWatchlist)
router.put("/:id",validaterequest(watchlistUpdateSchema),updateWatchlistItem)
router.delete("/:id",deleteFromWatchlist)

export default router;