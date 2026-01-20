import jobService from '../services/Job.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { STATUS_CODES } from '../constants/app.constants.js';


const createJob = async (req, res, next) => {
    try {
        const job = await jobService.createJob(req.body);
        res.status(STATUS_CODES.CREATED).json(new ApiResponse(STATUS_CODES.CREATED, job, 'Job created successfully'));
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const result = await jobService.getAllJobs(req.query);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, result, 'Jobs fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getJobById = async (req, res, next) => {
    try {
        const job = await jobService.getJobById(req.params.id, req.user?._id);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, job, 'Job fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const updateJob = async (req, res, next) => {
    try {
        const job = await jobService.updateJob(req.params.id, req.body);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, job, 'Job updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteJob = async (req, res, next) => {
    try {
        await jobService.deleteJob(req.params.id);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, null, 'Job deleted successfully'));
    } catch (error) {
        next(error);
    }
};

const applyJob = async (req, res, next) => {
    try {
        const application = await jobService.applyJob(
            req.params.id,
            req.user._id,
            req.user.resumeLink
        );
        res.status(STATUS_CODES.CREATED).json(new ApiResponse(STATUS_CODES.CREATED, application, 'Application submitted successfully'));
    } catch (error) {
        next(error);
    }
};

const saveJob = async (req, res, next) => {
    try {
        const result = await jobService.toggleSaveJob(req.params.id, req.user._id);
        const message = result.isSaved ? 'Job saved successfully' : 'Job removed from saved list';
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, result, message));
    } catch (error) {
        next(error);
    }
};

const getAppliedJobs = async (req, res, next) => {
    try {
        const applications = await jobService.getAppliedJobs(req.user._id);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, applications, 'Applied jobs fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getSavedJobs = async (req, res, next) => {
    try {
        const savedJobs = await jobService.getSavedJobs(req.user._id);
        res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, savedJobs, 'Saved jobs fetched successfully'));
    } catch (error) {
        next(error);
    }
};

export default {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    applyJob,
    saveJob,
    getAppliedJobs,
    getSavedJobs
};
