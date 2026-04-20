import express from "express";
import {addToWatchlist, deleteFromWatchlist, updateWatchlistItem} from "../controller//watchlistController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();
router.use(authMiddleware) // Apply authentication middleware to all routes in this router

router.post("/",addToWatchlist)
router.put("/:id",updateWatchlistItem)
router.delete("/:id",deleteFromWatchlist)

export default router;