import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Users from "./../models/user";

// @desc       search on profile
// @route     /user/:userName
// @access    GET/public

const searchForUser = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    res.send(req.searchUser);
  }
);

const getUserLoggedData = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, role, courses, profileImage } = req.user;
    res.send({ fullName, email, role, courses, profileImage });
  }
);

// @desc       update bio on profile
// @route     /user/updateBio
// @access    PUT/public

const updateBio = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bio } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.user._id,
      { $set: { bio } },
      { new: true }
    );
    res.send(user);
  }
);

// @desc       update image on profile
// @route     /user/updateImage
// @access    PUT/public

const updateImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await Users.findById(req.user._id).select(
      "-password -canChangePassword  -passwordCreationDate -createdAt -updatedAt -__v"
    );
    user.profileImage = req.fileName;
    await user?.save();
    res.send(user);
  }
);

export { searchForUser, updateBio, updateImage, getUserLoggedData };
