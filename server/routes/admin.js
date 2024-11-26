import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
  getAllUser,
  updateRole,
} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

// router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
// router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
// router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
// router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
// router.get("/stats", isAuth, isAdmin, getAllStats);
// router.put("/user/:id", isAuth, updateRole);
// router.get("/users", isAuth, isAdmin, getAllUser);
router.post("/course/new" , uploadFiles, createCourse);
router.post("/course/:id" , uploadFiles, addLectures);
router.delete("/course/:id" , deleteCourse);
router.delete("/lecture/:id" , deleteLecture);
router.get("/stats" , getAllStats);
router.put("/user/:id" , updateRole);
router.get("/users" , getAllUser);


export default router;
