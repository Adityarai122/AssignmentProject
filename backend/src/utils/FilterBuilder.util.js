class FilterBuilder {
    constructor(query) {
        this.query = query;
        this.filter = {};
    }

    addStatus() {
        if (this.query.status) {
            this.filter.status = this.query.status;
        }
        return this;
    }

    addJobType() {
        if (this.query.type) {
            this.filter.type = this.query.type;
        } else if (this.query.jobType) {
            // Handle alias if user sends 'jobType'
            this.filter.type = this.query.jobType;
        }
        return this;
    }

    addLocation() {
        if (this.query.location) {
            this.filter.location = { $regex: this.query.location, $options: 'i' };
        }
        return this;
    }

    addCompany() {
        if (this.query.company) {
            this.filter.company = { $regex: this.query.company, $options: 'i' };
        }
        return this;
    }

    addRole() {
        if (this.query.role) {
            // "Role" maps to searching the 'title'
            this.filter.title = { $regex: this.query.role, $options: 'i' };
        }
        return this;
    }

    addSkills() {
        if (this.query.skills) {
            const skillsArray = this.query.skills.split(',').map(s => s.trim());
            this.filter.skills = { $in: skillsArray.map(s => new RegExp(s, 'i')) };
        }
        return this;
    }

    addExperienceLevel() {
        if (this.query.experienceLevel) {
            this.filter.experienceLevel = this.query.experienceLevel;
        }
        return this;
    }

    addIndustry() {
        if (this.query.industry) {
            this.filter.industry = this.query.industry;
        }
        return this;
    }

    addSalaryRange() {
        if (this.query.minSalary) {
            const min = Number(this.query.minSalary);
            if (!isNaN(min)) {
                this.filter['salary.max'] = { $gte: min };
            }
        }
        if (this.query.maxSalary) {
            const max = Number(this.query.maxSalary);
            if (!isNaN(max)) {
                this.filter['salary.min'] = { $lte: max };
            }
        }
        return this;
    }

    addSearch() {
        if (this.query.query) {
            const sanitized = this.query.query.trim().replace(/\s+/g, ' ');
            const regexStr = sanitized
                .split(' ')
                .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                .join('[\\s-]*');

            const searchRegex = { $regex: regexStr, $options: 'i' };
            this.filter.$or = [
                { title: searchRegex },
                { company: searchRegex }
            ];
        }
        return this;
    }

    build() {
        return this.addStatus()
            .addJobType()
            .addLocation()
            .addCompany()
            .addRole()
            .addSkills()
            .addExperienceLevel()
            .addIndustry()
            .addSalaryRange()
            .addSearch()
            .filter;
    }
}

export default FilterBuilder;
