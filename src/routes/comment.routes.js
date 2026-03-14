import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const writeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        message: "Too many attempts, please try again later."
    }
});
const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(writeLimiter, addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router