import { Router } from "express";
import contactController from "../controllers/contact.controllers.js"

const router = Router();

router.get("/email", contactController.emailSender)

export default router;