import User from '../models/User.model.js';

class UserRepository {
    async findById(id) {
        return await User.findById(id);
    }

    async findByIdWithSavedJobs(id) {
        return await User.findById(id).populate('savedJobs');
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    async addSavedJob(userId, jobId) {
        return await User.findByIdAndUpdate(
            userId,
            { $addToSet: { savedJobs: jobId } },
            { new: true }
        );
    }

    async removeSavedJob(userId, jobId) {
        return await User.findByIdAndUpdate(
            userId,
            { $pull: { savedJobs: jobId } },
            { new: true }
        );
    }
}

export default new UserRepository();
