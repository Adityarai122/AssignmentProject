import express from 'express';
import jobController from '../controllers/Job.controller.js';
import validate from '../middlewares/validate.middleware.js'; // Placeholder for now

// Step 8: Routing Layer
// Responsibility: Define REST endpoints. Map routes → controller.

const router = express.Router();

import { protect, optionalProtect } from '../middlewares/auth.middleware.js';

router.post('/', validate(), jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/applied', protect, jobController.getAppliedJobs); // Must be before /:id
router.get('/saved', protect, jobController.getSavedJobs);     // Must be before /:id
router.get('/:id', optionalProtect, jobController.getJobById);
router.put('/:id', validate(), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

// Interaction Routes
router.post('/:id/apply', protect, jobController.applyJob);
router.post('/:id/save', protect, jobController.saveJob);

export default router;
