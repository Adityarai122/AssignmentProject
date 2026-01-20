import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.model.js';
import { AUTH_CONSTANTS, STATUS_CODES } from '../constants/app.constants.js';

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies[AUTH_CONSTANTS.COOKIE_NAME]) {
        token = req.cookies[AUTH_CONSTANTS.COOKIE_NAME];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, AUTH_CONSTANTS.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'User not found'));
            }
            next();
        } catch (error) {
            next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed'));
        }
    } else {
        next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Not authorized, no token'));
    }
};

const optionalProtect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies[AUTH_CONSTANTS.COOKIE_NAME]) {
        token = req.cookies[AUTH_CONSTANTS.COOKIE_NAME];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, AUTH_CONSTANTS.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            // Silently fail for optional protect
        }
    }
    next();
};

export { protect, optionalProtect };
