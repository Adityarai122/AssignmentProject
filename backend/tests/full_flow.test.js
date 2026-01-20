// Integration Test: User Flow, Job Interaction, Filtering
import assert from 'assert';
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8000/api/v1';

let authToken = '';
let userId = '';
let jobId = '';

const runTests = async () => {
    console.log('🚀 Starting Full Flow Integration Tests...');

    // 1. Register User
    console.log('\nTEST 1: Register User');
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    try {
        const res = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Flow User",
                email: uniqueEmail,
                password: "password123",
                skills: ["Node.js", "React"]
            })
        });
        const data = await res.json();

        if (res.status === 201) {
            authToken = data.data.token;
            userId = data.data._id;
            console.log('✅ Passed: User Registered');
        } else {
            console.error('❌ Failed: User Register', data.message);
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Error: Register', err.message);
    }

    // 2. Create Job (With Skills & Rich Description)
    console.log('\nTEST 2: Create Job');
    try {
        const jobData = {
            title: "Senior Node.js Developer",
            company: "Tech Giant",
            location: "San Francisco",
            description: [
                { heading: "About", content: "Great role" },
                { heading: "Responsibilities", content: "Code stuff" }
            ],
            skills: ["Node.js", "MongoDB", "AWS"],
            type: "FULL_TIME",
            experienceLevel: "SENIOR",
            industry: "TECHNOLOGY",
            salary: { min: 120000, max: 180000 },
            requirements: ["5+ years exp"]
        };

        const res = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        const data = await res.json();

        if (res.status === 201) {
            jobId = data.data._id;
            assert.strictEqual(data.data.skills.length, 3);
            assert.strictEqual(data.data.description.length, 2);
            assert.strictEqual(data.data.applicantsCount, 0);
            console.log('✅ Passed: Job Created with Skills & Description');
        } else {
            console.error('❌ Failed: Create Job', data);
        }
    } catch (err) {
        console.error('❌ Error: Create Job', err);
    }

    // 3. Apply for Job
    console.log('\nTEST 3: Apply for Job');
    try {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await res.json();

        if (res.status === 201) {
            console.log('✅ Passed: Applied Successfully');

            // Verify count increment
            const jobRes = await fetch(`${BASE_URL}/jobs/${jobId}`);
            const jobData = await jobRes.json();
            assert.strictEqual(jobData.data.applicantsCount, 1, 'Applicants count should be 1');
            console.log('✅ Passed: Applicants Count Incremented');
        } else {
            console.error('❌ Failed: Apply', data.message);
        }
    } catch (err) {
        console.error('❌ Error: Apply', err);
    }

    // 4. Save Job
    console.log('\nTEST 4: Save Job');
    try {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}/save`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await res.json();

        if (res.status === 200 && data.data.isSaved === true) {
            console.log('✅ Passed: Job Saved');

            // Verify saved list
            const savedRes = await fetch(`${BASE_URL}/jobs/saved`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            const savedData = await savedRes.json();
            const savedJobIds = savedData.data.map(j => j._id);
            assert.ok(savedJobIds.includes(jobId), 'Job should be in saved list');
            console.log('✅ Passed: Saved Jobs List Validated');
        } else {
            console.error('❌ Failed: Save', data);
        }
    } catch (err) {
        console.error('❌ Error: Save', err);
    }

    // 5. Filter Jobs by Skill
    console.log('\nTEST 5: Filter by Skills');
    try {
        // Filter for "Node.js"
        const res = await fetch(`${BASE_URL}/jobs?skills=Node.js`);
        const data = await res.json();

        assert.status === 200;
        // Should find our job
        const found = data.data.jobs.some(j => j._id === jobId);
        assert.ok(found, 'Should find the job with Node.js skill');
        console.log('✅ Passed: Filter by Skill Success');

        // Filter for "Java" (Should NOT find)
        const res2 = await fetch(`${BASE_URL}/jobs?skills=Java`);
        const data2 = await res2.json();
        const found2 = data2.data.jobs.some(j => j._id === jobId);
        assert.ok(!found2, 'Should NOT find job with missing skill');
        console.log('✅ Passed: Filter by Missing Skill Correct');

    } catch (err) {
        console.error('❌ Error: Filter', err);
    }

    // 6. Delete Account
    console.log('\nTEST 6: Delete Account');
    try {
        const res = await fetch(`${BASE_URL}/users/profile`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (res.status === 200) {
            console.log('✅ Passed: Account Deleted');
        } else {
            console.error('❌ Failed: Delete Account', await res.json());
        }
    } catch (err) {
        console.error('❌ Error: Delete Account', err);
    }
};

runTests();
