
import User from "../modules/user.module.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("api Router is working");
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can only update your own account"));
    }

    const { username } = req.body;

    if (!username || !username.trim()) {
      return next(errorHandler(400, "Username is required"));
    }

    const existingUser = await User.findOne({
      username: username.trim(),
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return next(errorHandler(409, "Username is already taken"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: username.trim(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...userData } = updatedUser._doc;

    res.status(200).json(userData);
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(409, "Username is already taken"));
    }

    next(error);
  }
};

export const signOut = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({
      success: true,
      message: "Signed out successfully",
    });
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(403, "You can only delete your own account")
      );
    }

    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }

    res
      .clearCookie("access_token")
      .status(200)
      .json({
        success: true,
        message: "Account deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};