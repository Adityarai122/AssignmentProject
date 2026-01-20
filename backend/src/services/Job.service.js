import jobRepository from '../repositories/Job.repository.js';
import applicationRepository from '../repositories/Application.repository.js';
import userRepository from '../repositories/User.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { getPagination } from '../utils/Pagination.util.js';
import FilterBuilder from '../utils/FilterBuilder.util.js';
import { JOB_STATUS } from '../constants/job.constants.js';
import { STATUS_CODES, JOB_CONSTANTS } from '../constants/app.constants.js';


const createJob = async (jobData) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (JOB_CONSTANTS.EXPIRY_DAYS || 30));

    const newJobData = {
        ...jobData,
        status: JOB_STATUS.ACTIVE,
        expiresAt,
    };

    return await jobRepository.create(newJobData);
};

const getJobById = async (id, userId = null) => {
    const job = await jobRepository.findById(id);
    if (!job) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'Job not found');
    }

    const jobObj = job.toObject();
    if (userId) {
        const application = await applicationRepository.findOne({ user: userId, job: id });
        jobObj.applicationStatus = application ? application.status : null;
    }

    return jobObj;
};

const getAllJobs = async (query) => {
    const { page, limit } = query;
    const pagination = getPagination(page, limit);

    // Step 6: Filter Logic (OCP Refined)
    const filter = new FilterBuilder(query).build();

    const jobs = await jobRepository.findAll(filter, pagination);
    const total = await jobRepository.count(filter);

    return {
        jobs,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total,
            pages: Math.ceil(total / pagination.limit),
        },
    };
};

const updateJob = async (id, updateData) => {
    await getJobById(id);
    return await jobRepository.update(id, updateData);
};

const deleteJob = async (id) => {
    await getJobById(id);
    return await jobRepository.delete(id);
};

const applyJob = async (jobId, userId, resumeLink) => {
    const job = await getJobById(jobId);

    const existingApplication = await applicationRepository.findOne({ user: userId, job: jobId });
    if (existingApplication) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, 'You have already applied for this job');
    }

    const application = await applicationRepository.create({
        user: userId,
        job: jobId,
        resumeLink
    });
    await jobRepository.incrementApplicantsCount(jobId);

    return application;
};

const toggleSaveJob = async (jobId, userId) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');

    const isAlreadySaved = user.savedJobs.includes(jobId);
    let isSaved = false;

    if (isAlreadySaved) {
        await userRepository.removeSavedJob(userId, jobId);
    } else {
        await userRepository.addSavedJob(userId, jobId);
        isSaved = true;
    }

    return { isSaved };
};

const getAppliedJobs = async (userId) => {
    return await applicationRepository.findByUserId(userId);
};

const getSavedJobs = async (userId) => {
    const user = await userRepository.findByIdWithSavedJobs(userId);
    if (!user) throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
    return user.savedJobs;
};

export default {
    createJob,
    getJobById,
    getAllJobs,
    updateJob,
    deleteJob,
    applyJob,
    toggleSaveJob,
    getAppliedJobs,
    getSavedJobs
};
