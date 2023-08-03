import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import Users from "./../models/user";
import { StatusCodes } from "http-status-codes";
import Courses from "../models/courses";

// @desc       update image on profile
// @route     /api/v1/teacher/updateImage
// @access    PUT/public
export const updateImage = expressAsyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user: any = await Users.findById(req.user._id);
    user.profileImage = req.fileName;
    await user?.save();
    res.send(user);
  }
);

// @desc       add course to teacher's courses
// @route     /api/v1/teacher/addCourse
// @access    POST/public
export const addCourse = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacher = await Users.findById(req.user._id);
    if (!teacher) {
      return next(new ApiError(`Teacher not found`, 404));
    }
    const { courseName, description, sections } = req.body;

    const course = new Courses({
      courseName: courseName,
      courseDescription: description,
      teacherId: req.user._id,
      courseImage: req.fileName,
      sections,
    });
    await course.save();

    teacher.courses.push(course._id);
    await teacher.save();

    res.json(course);
  }
);

// Search courses by name within the teacher's courses

// @desc       get teacher's course
// @route     /api/v1/teacher/getCourses
// @access    GET/public
export const getCourse = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacher = await Users.findById(req.user._id);
      if (!teacher) {
        return next(new Error(`Teacher not found`));
      }

      // Get the search query from the request query
      const searchQuery: string = req.query.courseName as string;

      // Fetch courses using the Courses model and teacherId, with the search query
      const courses = await Courses.find({
        teacherId: req.user._id,

        courseName: { $regex: `\\b${searchQuery}\\b`, $options: "i" }, // Case-insensitive search
      });

      // Return the courses in the response
      res.json({ courses });
    } catch (error) {
      next(error);
    }
  }
);

// @desc       get teacher's courses
// @route     /api/v1/teacher/getCourses
// @access    GET/public
export const getCourses = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const teacher = await Users.findById(req.user._id);
      if (!teacher) {
        return next(new Error(`Teacher not found`));
      }

      // Pagination variables
      const page = +req.query?.page || 1;
      const limit = +req.query?.limit || 10;
      const skip = (page - 1) * limit;

      // Fetch courses using the Courses model and teacherId
      const courses = await Courses.find({ teacherId: req.user._id })
        .skip(skip)
        .limit(limit);

      // Count total number of documents to calculate pagination
      const countDocuments = await Courses.countDocuments({
        teacherId: req.user._id,
      });

      // Calculate pagination details
      const pagination: any = {};
      pagination.currentPage = page;
      pagination.limit = limit;
      pagination.numberOfPages = Math.ceil(countDocuments / limit);

      if (skip + limit < countDocuments) {
        pagination.nextPage = page + 1;
      }

      if (skip > 0) {
        pagination.previousPage = page - 1;
      }

      // Return the courses and pagination details in the response
      res.json({ courses, pagination });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Get logged users
// @route   Get /api/v1/teacher/getMe
// @access  Private/Protect
export const getLoggedUserData = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user._id) {
      return next(new ApiError(`there is no user for this id logged in`, 400));
    } else {
      const User = await Users.findById(req.user._id);
      res.status(200).json({ User });
    }
  }
);

// @desc    Update logged user data without password and role
// @route   PUT /api/v1/teacher/updateCourse
// @access  Private/Protect
export const updateCourse = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //1) update user data based on the payload (req.body.user._id)

    const course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    //2) Generate the token and send it to the user
    if (!course) {
      //res.status(404).json({msg:`there is no brand for this id ${id}`})
      return next(
        new ApiError(`there is no user for this id ${req.user._id}`, 404)
      );
    } else {
      //const token = createToken(user._id);
      res.status(200).json({ data: course });
    }
  }
);
// @desc    delete logged user data without password and role
// @route   DELETE /api/v1/teacher/deleteCourse
// @access  Private/Protect
export const deleteCourse = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Deleted Successfully" });
  }
);

export const getCourseById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.courseId);
    if (!course) {
      return next(
        new ApiError(`there is no course for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ course });
  }
);
