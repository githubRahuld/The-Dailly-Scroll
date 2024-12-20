import { Router } from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    uploadAvatar,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

//avatar
router.route("/avatar").post(verifyJWT, uploadAvatar);
router.route("/update-avatar").put(verifyJWT, updateAvatar);

router.route("/curr-user").get(verifyJWT, getCurrentUser);
export default router;
