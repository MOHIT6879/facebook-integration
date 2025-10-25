import express from "express";
import { connectFacebook, facebookCallback } from "../controllers/facebookController.js";

const router = express.Router();

router.post("/connect", connectFacebook);
router.get("/callback", facebookCallback);

export default router;
