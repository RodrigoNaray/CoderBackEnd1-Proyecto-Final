import { Router } from "express";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

router.post("/register", passportCall("register"), sessionControllers.register);

router.post("/login", passportCall("login"), sessionControllers.login);


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  sessionControllers.googleLogin
);

router.get("/current", passportCall("current"), sessionControllers.current);

export default router;
