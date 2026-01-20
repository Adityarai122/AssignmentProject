import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/auth.util.js';
import { STATUS_CODES } from '../constants/app.constants.js';

const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, 'User already exists');
        }

        const user = await User.create({
            email,
            password
        });

        if (user) {
            const token = generateToken(user._id);
            setAuthCookie(res, token);

            res.status(STATUS_CODES.CREATED).json(new ApiResponse(STATUS_CODES.CREATED, {
                _id: user._id,
                name: user.name,
                email: user.email,
                token 
            }, 'User registered successfully'));
        } else {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, 'Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            setAuthCookie(res, token);

            res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, {
                _id: user._id,
                name: user.name,
                email: user.email,
                token 
            }, 'User logged in successfully'));
        } else {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res) => {
    clearAuthCookie(res);
    res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, null, 'Logged out successfully'));
};

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, {
                _id: user._id,
                name: user.name,
                email: user.email,
                skills: user.skills,
                experience: user.experience,
                savedJobs: user.savedJobs
            }));
        } else {
            throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
        }
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.skills) {
                user.skills = req.body.skills; 
            }

            const updatedUser = await user.save();

            const token = generateToken(updatedUser._id);
            setAuthCookie(res, token);

            res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            }, 'Profile updated successfully'));
        } else {
            throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
        }
    } catch (error) {
        next(error);
    }
};

const deleteUserProfile = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, null, 'User account deleted successfully'));
    } catch (error) {
        next(error);
    }
};

export default {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
