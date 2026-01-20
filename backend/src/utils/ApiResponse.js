import { STATUS_CODES } from '../constants/app.constants.js';

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < STATUS_CODES.BAD_REQUEST;
    }
}

export { ApiResponse };
