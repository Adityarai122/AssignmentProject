import jwt from 'jsonwebtoken';
import { AUTH_CONSTANTS } from '../constants/app.constants.js';

export const generateToken = (id) => {
    return jwt.sign({ id }, AUTH_CONSTANTS.JWT_SECRET, {
        expiresIn: AUTH_CONSTANTS.JWT_EXPIRE,
    });
};

export const setAuthCookie = (res, token) => {
    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: AUTH_CONSTANTS.COOKIE_MAX_AGE
    });
};

export const clearAuthCookie = (res) => {
    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, '', {
        httpOnly: true,
        expires: new Date(0)
    });
};
