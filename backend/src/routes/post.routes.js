import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createPost,
    deletePostById,
    getAllPostAvailable,
    getAllPosts,
    getPostById,
    updatePostById,
} from "../controllers/post.controllers.js";

const router = Router();

router.route("/").post(verifyJWT, createPost);
router.route("/").get(verifyJWT, getAllPosts);
router.route("/fetch-all").get(verifyJWT, getAllPostAvailable);
router.route("/:id").get(verifyJWT, getPostById);
router.route("/:id").put(verifyJWT, updatePostById);
router.route("/:id").delete(verifyJWT, deletePostById);

export default router;
