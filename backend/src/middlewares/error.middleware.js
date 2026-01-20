import { ApiError } from '../utils/ApiError.js';
import { STATUS_CODES } from '../constants/app.constants.js';

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, error?.errors || [], error.stack);
    }

    const response = {
        statusCode: error.statusCode,
        data: null,
        message: error.message,
        success: false,
        errors: error.errors,
        ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
