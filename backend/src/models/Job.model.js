import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE, JOB_EXPERIENCE_LEVELS, JOB_INDUSTRIES } from '../constants/job.constants.js';

const descriptionSectionSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    }
}, { _id: false });

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true 
        },
        company: {
            type: String,
            required: true,
            trim: true,
            index: true 
        },
        location: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description: {
            type: [descriptionSectionSchema],
            required: true,
            validate: [arrayLimit, '{PATH} must have at least one section']
        },
        skills: {
            type: [String],
            required: true,
            index: true // Filter by skill
        },
        status: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.ACTIVE,
            index: true
        },
        type: {
            type: String,
            enum: Object.values(JOB_TYPE),
            required: true,
            index: true
        },
        experienceLevel: {
            type: String,
            enum: Object.values(JOB_EXPERIENCE_LEVELS),
            required: true,
            index: true
        },
        industry: {
            type: String,
            enum: Object.values(JOB_INDUSTRIES),
            default: JOB_INDUSTRIES.OTHER,
            index: true
        },
        salary: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            currency: { type: String, default: 'USD' }
        },
        applicantsCount: {
            type: Number,
            default: 0
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        requirements: [String],
    },
    {
        timestamps: true,
    }
);

function arrayLimit(val) {
    return val.length > 0;
}

jobSchema.index({ status: 1, location: 1 });
jobSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
