import { NextFunction, Request, Response, Router } from "express";
import {
  confirmationCodeValidation,
  forgetPasswordValidation,
  loginValidation,
  signupValidation,
  updatePassword,
} from "../utils/authValidation";
import validResult from "../middlewares/validationResult";
import {
  canChangePassword,
  confirmationCode,
  forgetPassword,
  getMe,
  login,
  signup,
} from "../controllers/authServies";
import { protect, role } from "../middlewares/protect";
import { updatePassword as updatePasswordService } from "../controllers/authServies";
import rateLimiter from "express-rate-limit";
const router: Router = Router();
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 100 request in 15 minutes,
  message: "too many requests you can try again after 15 minutes",
}); // prevent more than 100 requests in 15 minutes
router.post("/signup", signupValidation, validResult, signup);
router.post("/login", limiter, loginValidation, validResult, login);
router.post(
  "/forgetPassword",
  forgetPasswordValidation,
  validResult,
  forgetPassword
);
router.post(
  "/confirmationCode",
  limiter,
  confirmationCodeValidation,
  validResult,
  confirmationCode
);
router.put(
  "/updatePassword",
  updatePassword,
  validResult,
  updatePasswordService
);
router.post(
  "/canChangePassword",
  forgetPasswordValidation,
  validResult,
  canChangePassword
);
router.post("/me", protect, getMe);
// router.get('/', protect ,role(["user"]))
export default router;
