import { request, response } from "express";
import { passportCall } from "./passport.middleware.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

export const isUserCart = async (req = request, res = response, next) => {
    const { cid } = req.params;


    const token = cookieExtractor(req);
    if (!token) {
        return res.status(401).json({ status: "error", msg: "No token provided" });
    }


    passportCall("current")(req, res, async (err) => {
        if (err || !req.user) {
            return res.status(401).json({ status: "error", msg: "User not authenticated" });
        }

        if (!req.user) {
            return res.status(401).json({ status: "error", msg: "User not authenticated" });
        }

        if (req.user.cart._id.toString() !== cid) {
            return res.status(401).json({ status: "error", msg: "Wrong cart user" });
        }

        next();
    });
};