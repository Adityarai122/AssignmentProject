export const AUTH_CONSTANTS = {
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
    JWT_EXPIRE: '5d',
    COOKIE_NAME: 'token',
    COOKIE_MAX_AGE: 30 * 24 * 60 * 60 * 1000, 
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const JOB_CONSTANTS = {
    DEFAULT_PAGE_LIMIT: 10,
    EXPIRY_DAYS: 30
};

export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
