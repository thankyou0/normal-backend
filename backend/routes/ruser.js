import express from "express";
const router = express.Router();
import { logInPost, signUpPost, isUserExistWhenSignUp, getUserProfile, updateUserProfile } from "../controllers/cuser.js";
import multer from "multer";
import {checkAuth} from "../middleware/checkAuth.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.post("/login", logInPost);

router.post("/signup", upload.single("certificate"), signUpPost);

router.post("/isuserexistwhensignup", isUserExistWhenSignUp);

router.get("/userprofile/get", checkAuth, getUserProfile);

router.post("/userprofile/update", checkAuth, updateUserProfile);


export {router};