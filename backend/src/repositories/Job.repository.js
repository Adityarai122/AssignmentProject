import Job from '../models/Job.model.js';

// Step 4: Repository Layer (OOPS abstraction)
// Responsibility: Pure Data Access Layer. No business rules.
class JobRepository {
    async create(jobData) {
        return await Job.create(jobData);
    }

    async findById(id) {
        return await Job.findById(id);
    }

    async findAll(filter = {}, paginationOption = {}) {
        // Accepts pre-built filter and pagination options
        const { skip, limit } = paginationOption;
        return await Job.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Default sort newest first
    }

    async count(filter = {}) {
        return await Job.countDocuments(filter);
    }

    async update(id, updateData) {
        return await Job.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id) {
        return await Job.findByIdAndDelete(id);
    }

    async incrementApplicantsCount(id) {
        return await Job.findByIdAndUpdate(
            id,
            { $inc: { applicantsCount: 1 } },
            { new: true }
        );
    }
}

export default new JobRepository();
