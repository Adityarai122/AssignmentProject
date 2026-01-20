import Application from '../models/Application.model.js';

class ApplicationRepository {
    async create(data) {
        return await Application.create(data);
    }

    async findOne(filter) {
        return await Application.findOne(filter);
    }

    async findByUserId(userId) {
        return await Application.find({ user: userId }).populate('job');
    }
}

export default new ApplicationRepository();
