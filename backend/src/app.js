import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import jobRoutes from './routes/Job.routes.js';
import authRoutes from './routes/Auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { CORS_ORIGIN } from './config/env.config.js';


const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routing Layer mapping 
app.use('/api/jobs', jobRoutes);
app.use('/api/users', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Job Application Backend API v1' });
});

// Global Error Handler 
app.use(errorHandler);

export default app;
