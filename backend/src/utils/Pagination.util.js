import { JOB_CONSTANTS } from '../constants/app.constants.js';
export const getPagination = (page, limit) => {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || JOB_CONSTANTS.DEFAULT_PAGE_LIMIT;
    const skip = (pageNumber - 1) * limitNumber;
    return { page: pageNumber, limit: limitNumber, skip };
};
