import { Router } from "express";
import { protect, role } from "../middlewares/protect";
import { userNameIsFound } from "../utils/userValidation";
import validResult from "../middlewares/validationResult";
import { getUserLoggedData, searchForUser, updateBio, updateImage } from "../controllers/userServices";
import { imageResizing, uploadMiddlewareImage } from "../middlewares/uploadImage";
import { courseIsFound, review } from "../utils/studentValidation";
import { addReview, enrollCourse, getCourse, getMyCourses, increaseProgress, showAllCourses } from "../controllers/courseServices";
import { getCourseById } from "../controllers/teacherService";

const router:Router = Router();


// update image    done
// enroll in course   done
// search on new course done
// get my courses done 
// get my profile done 
// increase progress done
// rate course done 



router.put('/addReview/:courseId', protect ,role(["student"]) , courseIsFound , review , validResult , addReview)
router.put('/increaseProgress/:courseId', protect ,role(["student"]) , courseIsFound , validResult , increaseProgress) // done
router.get('/showCourse/:courseId',courseIsFound , validResult , getCourseById) // done
router.get('/showAllCourses',showAllCourses) // done

router.get('/:courseId', protect ,role(["student"]) ,courseIsFound , validResult , getCourseById) // done
router.get('/searchCourse/:courseName', protect ,role(["student"]) , getCourse) // done
router.post('/myCourses', protect ,role(["student"]) , getMyCourses) // done
// router.get('/me', protect , getUserLoggedData) // done

router.post('/', protect ,role(["student"]),getUserLoggedData) // done
router.get('/enroll/:courseId', protect ,role(["student"]) , courseIsFound , validResult , enrollCourse) // done
router.put('/updateImage', protect ,role(["student"]) , uploadMiddlewareImage, imageResizing , updateImage)  //done

export default router
