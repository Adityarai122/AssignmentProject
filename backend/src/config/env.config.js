import dotenv from 'dotenv';

dotenv.config();

const _env = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV ,
};

export const { PORT, MONGODB_URI, NODE_ENV } = _env;
export default _env;
