// Step 13: Testing Layer
// Integration Tests for the Job API
// Note: This requires the server to be running and MongoDB to be accessible.

import assert from 'assert';
import fetch from 'node-fetch'; // Requires node-fetch or Node v18+ native fetch
// If Node v18+ is used, 'fetch' is global. If not, this import might fail without package.json 'type': 'module' support for modern node.
// Since we set "type": "module" in package.json, we can use top-level await and imports.

const BASE_URL = 'http://localhost:8000/api/v1/jobs';
let createdJobId = null;

const runTests = async () => {
    console.log('🚀 Starting Integration Tests...');

    // 1. Create Job
    console.log('\nTEST 1: Create Job');
    const jobData = {
        title: "Test Engineer",
        company: "Test Corp",
        location: "Test City",
        description: "Testing...",
        type: "CONTRACT",
        experienceLevel: "ENTRY",
        industry: "OTHER",
        salary: { min: 1000, max: 2000 }
    };

    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        const data = await res.json();

        assert.strictEqual(res.status, 201, 'Status should be 201');
        assert.ok(data.data._id, 'Job should have an ID');
        assert.strictEqual(data.data.title, jobData.title, 'Title should match');

        createdJobId = data.data._id;
        console.log('✅ Passed: Job Created');
    } catch (err) {
        console.error('❌ Failed: Create Job', err.message);
    }

    // 2. Get All Jobs
    console.log('\nTEST 2: Get All Jobs');
    try {
        const res = await fetch(`${BASE_URL}?limit=1`);
        const data = await res.json();

        assert.strictEqual(res.status, 200, 'Status should be 200');
        assert.ok(Array.isArray(data.data.jobs), 'Jobs should be an array');
        assert.ok(data.data.pagination, 'Pagination metadata should exist');
        console.log('✅ Passed: Fetch Jobs');
    } catch (err) {
        console.error('❌ Failed: Get All Jobs', err.message);
    }

    // 3. Get Job By ID
    if (createdJobId) {
        console.log('\nTEST 3: Get Job By ID');
        try {
            const res = await fetch(`${BASE_URL}/${createdJobId}`);
            const data = await res.json();

            assert.strictEqual(res.status, 200, 'Status should be 200');
            assert.strictEqual(data.data._id, createdJobId, 'ID should match');
            console.log('✅ Passed: Fetch Single Job');
        } catch (err) {
            console.error('❌ Failed: Get Job By ID', err.message);
        }
    }

    // 4. Update Job
    if (createdJobId) {
        console.log('\nTEST 4: Update Job');
        try {
            const updateData = { title: "Updated Engineer" };
            const res = await fetch(`${BASE_URL}/${createdJobId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            const data = await res.json();

            assert.strictEqual(res.status, 200, 'Status should be 200');
            assert.strictEqual(data.data.title, "Updated Engineer", 'Title should be updated');
            console.log('✅ Passed: Update Job');
        } catch (err) {
            console.error('❌ Failed: Update Job', err.message);
        }
    }

    // 5. Delete Job
    if (createdJobId) {
        console.log('\nTEST 5: Delete Job');
        try {
            const res = await fetch(`${BASE_URL}/${createdJobId}`, {
                method: 'DELETE'
            });

            assert.strictEqual(res.status, 200, 'Status should be 200');

            // Verify deletion
            const check = await fetch(`${BASE_URL}/${createdJobId}`);
            assert.strictEqual(check.status, 404, 'Job should be not found after delete');
            console.log('✅ Passed: Delete Job');
        } catch (err) {
            console.error('❌ Failed: Delete Job', err.message);
        }
    }
};

// Simple check to ensure server is running before testing could go here, 
// but for simplicity we assume the user follows the instruction to run server first.
runTests();
