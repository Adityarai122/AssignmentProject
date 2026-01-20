export const FILTER_CONFIGS = [
    {
        key: 'location',
        label: 'Location',
        options: ['Bangalore', 'Mumbai', 'Remote', 'Delhi', 'Hyderabad']
    },
    {
        key: 'type',
        label: 'Job Type',
        options: ['Full-time', 'Contract', 'Remote', 'Hybrid']
    },
    {
        key: 'experienceLevel',
        label: 'Experience',
        options: ['Entry-level', 'Mid-level', 'Senior', 'Lead']
    },
    {
        key: 'company',
        label: 'Company',
        options: ['Google', 'Amazon', 'Netflix', 'Meta', 'Stripe', 'Airbnb', 'Microsoft']
    },
    {
        key: 'skills',
        label: 'Skill',
        options: ['React', 'Node.js', 'Go', 'Python', 'AWS', 'TypeScript', 'Docker', 'Solidity']
    },
    {
        key: 'minSalary',
        label: 'Min Salary',
        options: ['50000', '100000', '150000', '200000']
    },
];

export const FILTER_DISPLAY_ORDER = ['Company', 'Jobs', 'Skill', 'Location', 'Salary', 'Job Type'];
