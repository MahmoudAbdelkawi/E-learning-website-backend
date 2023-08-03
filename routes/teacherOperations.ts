import { Router } from "express";
import { protect, role } from "../middlewares/protect";
import {  updateImage,addCourse,getCourse,getCourses,getLoggedUserData,updateCourse,deleteCourse, getCourseById } from "../controllers/teacherService";
import { imageResizing, uploadMiddlewareImage } from "../middlewares/uploadImage";

const router:Router = Router();
router.use(protect ,role(["teacher"]));


// add course
router.post('/addCourse',uploadMiddlewareImage, imageResizing , addCourse)
// search course in his courses
router.get('/getCustomCourse/:id', getCourseById)


router.get('/getCourse', getCourse)
// get my courses
router.get('/getCourses', getCourses)
// get my profile
router.get('/getMe',getLoggedUserData)
// edit course
router.put('/updateCourse/:id', updateCourse)
// delete course
router.delete('/deleteCourse/:id', deleteCourse)



// router.put('/updateBio', protect ,role(["teacher"]) , updateBio)
// update image
router.put('/updateImage',uploadMiddlewareImage, imageResizing , updateImage)

export default router
