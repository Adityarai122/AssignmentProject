import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/Job.model.js';
import { JOB_TYPE, JOB_EXPERIENCE_LEVELS, JOB_INDUSTRIES } from '../constants/job.constants.js';

dotenv.config();

const jobs = [
    {
        title: "Senior Backend Developer",
        company: "Google",
        location: "Hyderabad",
        description: [
            { heading: "Job Overview", content: "We are looking for a Senior Backend Developer to join our Cloud Infrastructure team. You will be responsible for designing and implementing high-availability services." },
            { heading: "Requirements", content: "Proficiency in Go, Java, or Python. Experience with distributed systems and Kubernetes is a plus." }
        ],
        skills: ["Go", "Kubernetes", "Distributed Systems", "Java"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.SENIOR,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 45, max: 85, currency: "LPA" },
        requirements: ["6+ years of experience", "B.Tech in Computer Science"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Full Stack Developer",
        company: "Microsoft",
        location: "Hyderabad",
        description: [
            { heading: "About the Role", content: "Join the Azure team to build next-generation developer tools. You will work across the stack from React frontends to C# backends." },
            { heading: "What we look for", content: "Passion for building developer-centric products and strong problem-solving skills." }
        ],
        skills: ["C#", "React", "Azure", "TypeScript"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 35, max: 65, currency: "LPA" },
        requirements: ["3+ years of experience", "Strong fundamentals in DS & Algo"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Lead UI/UX Designer",
        company: "Flipkart",
        location: "Mumbai",
        description: [
            { heading: "Vision", content: "Lead the design language for our mobile-first e-commerce experience. You will manage a team of 5 designers." },
            { heading: "Responsibilities", content: "Create wireframes, prototypes, and high-fidelity designs. Conduct user research and A/B testing." }
        ],
        skills: ["Figma", "User Research", "Visual Design", "Prototyping"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.LEAD,
        industry: JOB_INDUSTRIES.MARKETING,
        salary: { min: 40, max: 70, currency: "LPA" },
        requirements: ["8+ years in Design", "Portfolio demonstrating e-commerce success"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Graphic Designer",
        company: "Zomato",
        location: "Delhi",
        description: [
            { heading: "Creative Impact", content: "Design social media campaigns and app banners that reach millions of users daily." },
            { heading: "Tools of the trade", content: "Expertise in Adobe Creative Suite and a sharp eye for typography and layout." }
        ],
        skills: ["Photoshop", "Illustrator", "After Effects"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.MARKETING,
        salary: { min: 12, max: 20, currency: "LPA" },
        requirements: ["2+ years experience", "Creative portfolio"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Backend Developer (Node.js)",
        company: "Swiggy",
        location: "Remote",
        description: [
            { heading: "Scale", content: "Help us optimize our logistics engine that handles 100k+ orders per hour. Focus on Node.js and Redis." },
            { heading: "Tech Stack", content: "Node.js, PostgreSQL, Redis, Kafka." }
        ],
        skills: ["Node.js", "Redis", "Kafka", "PostgreSQL"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 25, max: 45, currency: "LPA" },
        requirements: ["4+ years experience", "Distributed systems knowledge"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Software Engineer (Intern)",
        company: "Amazon",
        location: "Delhi",
        description: [
            { heading: "Learning Path", content: "Work with senior engineers on Amazon India's retail platform. Learn about large-scale Java services." }
        ],
        skills: ["Java", "SQL", "Data Structures"],
        type: JOB_TYPE.INTERNSHIP,
        experienceLevel: JOB_EXPERIENCE_LEVELS.ENTRY,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 4, max: 6, currency: "LPA" },
        requirements: ["Final year B.Tech student", "Excellent coding skills"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Lead Frontend Engineer",
        company: "Paytm",
        location: "Delhi",
        description: [
            { heading: "Challenges", content: "Re-architect the payment gateway frontend for performance and security. Manage micro-frontends." }
        ],
        skills: ["React", "Micro-frontends", "Web Performance", "Jest"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.LEAD,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 45, max: 75, currency: "LPA" },
        requirements: ["7+ years experience", "Architecture background"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "UI/UX Designer",
        company: "Dream11",
        location: "Mumbai",
        description: [
            { heading: "GamingUX", content: "Design the most engaging fantasy sports experience in India. Focus on real-time feedback and excitement." }
        ],
        skills: ["Figma", "Prototyping", "Animation"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.MARKETING,
        salary: { min: 20, max: 35, currency: "LPA" },
        requirements: ["3+ years experience", "Passionate about sports and design"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Android Developer",
        company: "Ola",
        location: "Bangalore",
        description: [
            { heading: "Mobility", content: "Build features for the rider app used by millions. Focus on maps integration and real-time tracking." }
        ],
        skills: ["Kotlin", "Android SDK", "Maps API", "Dagger"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 22, max: 40, currency: "LPA" },
        requirements: ["3-5 years Android exp", "Published apps on Play Store"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Cloud Architect",
        company: "Reliance Jio",
        location: "Mumbai",
        description: [
            { heading: "The Task", content: "Design the cloud infrastructure for India's largest telecom and digital ecosystem." }
        ],
        skills: ["AWS", "Azure", "Terraform", "Security"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.SENIOR,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 50, max: 90, currency: "LPA" },
        requirements: ["10+ years experience", "Cloud certification"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Graphic Designer (Contract)",
        company: "Nykaa",
        location: "Mumbai",
        description: [
            { heading: "Brand Identity", content: "Help us design digital assets for the upcoming festive sale. 6-month contract with possibility of extension." }
        ],
        skills: ["Illustrator", "Typography", "Branding"],
        type: JOB_TYPE.CONTRACT,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.MARKETING,
        salary: { min: 8, max: 12, currency: "LPA" },
        requirements: ["Portfolio required", "Fashion/E-comm experience preferred"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Backend Developer (Go)",
        company: "Uber",
        location: "Hyderabad",
        description: [
            { heading: "Efficiency", content: "Work on the marketplace team optimizing real-time matching algorithms using Golang." }
        ],
        skills: ["Go", "Distributed Systems", "Algorithm Optimization"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 40, max: 70, currency: "LPA" },
        requirements: ["Experience with Go at scale", "Problem solving mindset"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Full Stack Developer (Part-time)",
        company: "Mohali Tech Lab",
        location: "Mohali",
        description: [
            { heading: "Flexibility", content: "Help us build prototypes for healthcare startups on a part-time basis. 20 hours/week." }
        ],
        skills: ["Node.js", "React", "Firebase"],
        type: JOB_TYPE.PART_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.ENTRY,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 6, max: 10, currency: "LPA" },
        requirements: ["Knowledge of MERN stack", "Proactive communicator"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Senior UI Architect",
        company: "Microsoft",
        location: "Hyderabad",
        description: [
            { heading: "Platform", content: "Design core UI libraries used by thousands of internal Microsoft products. Innovation at scale." }
        ],
        skills: ["TypeScript", "Web Components", "Design Systems"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.SENIOR,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 55, max: 95, currency: "LPA" },
        requirements: ["8+ years engineering", "Deep JS knowledge"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Data Engineer",
        company: "BookMyShow",
        location: "Mumbai",
        description: [
            { heading: "Big Data", content: "Build data pipelines to process ticket booking trends and personalize recommendations." }
        ],
        skills: ["Spark", "Python", "ETL", "Airflow"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 18, max: 30, currency: "LPA" },
        requirements: ["3+ years experience", "SQL expertise"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Security Engineer",
        company: "Myntra",
        location: "Bangalore",
        description: [
            { heading: "Protection", content: "Maintain the security posture of our e-commerce platform. Perform penetration testing and vulnerability assessments." }
        ],
        skills: ["Penetration Testing", "Network Security", "Auth0"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.SENIOR,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 30, max: 55, currency: "LPA" },
        requirements: ["5+ years cybersecurity", "Relevant certifications (CEH, OSCP)"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "DevOps Engineer",
        company: "Meesho",
        location: "Mohali",
        description: [
            { heading: "Infrastructure", content: "Streamline our CI/CD pipelines to support rapid feature deployments for the social commerce app." }
        ],
        skills: ["Docker", "Jenkins", "AWS", "Ansible"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 15, max: 28, currency: "LPA" },
        requirements: ["Experience with cloud automation", "Scripting skills (Python/Bash)"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Product Intern",
        company: "Razorpay",
        location: "Mumbai",
        description: [
            { heading: "Product Management", content: "Assist product managers in gathering requirements and coordinate with engineering for the checkout experience." }
        ],
        skills: ["Agile", "Excel", "Communication"],
        type: JOB_TYPE.INTERNSHIP,
        experienceLevel: JOB_EXPERIENCE_LEVELS.ENTRY,
        industry: JOB_INDUSTRIES.FINANCE,
        salary: { min: 5, max: 8, currency: "LPA" },
        requirements: ["Pursuing MBA or Technical degree", "Analytical thinking"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Lead Full Stack Developer",
        company: "Tata Digital",
        location: "Mumbai",
        description: [
            { heading: "SuperApp", content: "Lead the development of modules for the Tata Neu Super App. Balance scale, reliability and feature velocity." }
        ],
        skills: ["MERN Stack", "AWS", "System Design"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.LEAD,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 45, max: 80, currency: "LPA" },
        requirements: ["9+ years experience", "Team management experience"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Graphic Designer",
        company: "Lenskart",
        location: "Delhi",
        description: [
            { heading: "Visual Storytelling", content: "Create visual content for online and offline retail. Focus on eyewear aesthetics and brand consistency." }
        ],
        skills: ["Adobe Suite", "Creative Direction", "3D Rendering"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.MARKETING,
        salary: { min: 10, max: 18, currency: "LPA" },
        requirements: ["3+ years design exp", "Strong portfolio"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
        title: "Python Developer",
        company: "Dunzo",
        location: "Bangalore",
        description: [
            { heading: "Microservices", content: "Develop and maintain robust Python microservices for our hyper-local delivery engine." }
        ],
        skills: ["Python", "Django", "FastAPI", "MongoDB"],
        type: JOB_TYPE.FULL_TIME,
        experienceLevel: JOB_EXPERIENCE_LEVELS.MID,
        industry: JOB_INDUSTRIES.TECHNOLOGY,
        salary: { min: 16, max: 30, currency: "LPA" },
        requirements: ["3+ years Python experience", "Database optimization skills"],
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Job.deleteMany({});
        console.log('Existing jobs cleared.');

        await Job.insertMany(jobs);
        console.log('21 Indian technical jobs seeded successfully.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
